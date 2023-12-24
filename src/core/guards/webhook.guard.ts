import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createHmac, timingSafeEqual } from 'crypto'
import { IncomingMessage } from 'http'

@Injectable()
export class WebhookGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<RawBodyRequest<IncomingMessage>>()

    const hmacHeader = req.headers['x-hub-signature-256']
    if (!hmacHeader || typeof hmacHeader !== 'string') {
      throw new UnauthorizedException(`Not Authorized`)
    }

    if (!req.rawBody) {
      throw new InternalServerErrorException(`Raw body not found`)
    }

    const signature = createHmac('sha256', this.configService.get('GITHUB_SECRET'))
      .update(req.rawBody)
      .digest('hex')

    const generatedHashBuffer = Buffer.from(`sha256=${signature}`, 'ascii')
    const hmacBuffer = Buffer.from(hmacHeader, 'ascii')
    if (
      generatedHashBuffer.length !== hmacBuffer.length ||
      !timingSafeEqual(generatedHashBuffer, hmacBuffer)
    ) {
      throw new UnauthorizedException(`Not Authorized`)
    }

    return true
  }
}
