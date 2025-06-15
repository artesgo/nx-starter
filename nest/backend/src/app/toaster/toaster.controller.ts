import { Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';

@Controller('toaster')
export class ToasterController {
  @Get()
  getToaster(@Res() res) {
    return new Promise((resolve) => resolve(res.json({ body: 'toaster' })));
  }

  @Post('/:id')
  getToasterById(@Res() res, id: string) {
    return new Promise((resolve) => resolve(res.json({ body: 'toaster' })));
  }

  @Put()
  updateToaster(@Res() res) {
    return new Promise((resolve) => resolve(res.json({ body: 'toaster' })));
  }

  @Delete()
  deleteToaster(@Res() res) {
    return new Promise((resolve) => resolve(res.json({ body: 'toaster' })));
  }
}
