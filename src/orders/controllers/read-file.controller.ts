import { Controller, Get } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('read-file')
export class ReadFileController {
  @Get()
  getFile() {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return console.log(file);
  }
}
