import { Test, TestingModule } from '@nestjs/testing';
import { QrCodesController } from './qr-codes.controller';
import { QrCodesService } from './qr-codes.service';

describe('QrCodesController', () => {
  let controller: QrCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrCodesController],
      providers: [QrCodesService],
    }).compile();

    controller = module.get<QrCodesController>(QrCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
