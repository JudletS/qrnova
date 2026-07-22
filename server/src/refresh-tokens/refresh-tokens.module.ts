import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokensController } from './refresh-tokens.controller';
import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  imports: [PrismaModule],
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
