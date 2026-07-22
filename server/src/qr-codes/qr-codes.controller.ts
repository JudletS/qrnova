import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QrCodesService } from './qr-codes.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';

@Controller('qr-codes')
export class QrCodesController {
  constructor(private readonly qrCodesService: QrCodesService) {}

  @Post()
  create(@Body() createQrCodeDto: CreateQrCodeDto) {
    return this.qrCodesService.create(createQrCodeDto);
  }

  @Get()
  findAll() {
    return this.qrCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrCodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQrCodeDto: UpdateQrCodeDto) {
    return this.qrCodesService.update(+id, updateQrCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrCodesService.remove(+id);
  }
}
