import { Module } from '@nestjs/common';
import { QrCodesService } from './qr-codes.service';
import { QrCodesController } from './qr-codes.controller';

@Module({
  controllers: [QrCodesController],
  providers: [QrCodesService],
})
export class QrCodesModule {}
