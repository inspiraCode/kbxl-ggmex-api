import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import readXlsxFile = require('read-excel-file/node');

const schema = {
  AppointmentDate: {
    prop: 'appointmentDate',
    type: Date,
  },
  SR: {
    prop: 'shipmentNumber',
    type: String,
  },
  Customer: {
    prop: 'customerName',
    type: String,
  },
  City: {
    prop: 'city',
    type: String,
  },
  State: {
    prop: 'state',
    type: String,
  },
  DeliveryTerms: {
    prop: 'deliveryTerms',
    type: String,
  },
  Carrier: {
    prop: 'ligisticsAgent',
    type: String,
  },
  SRFreight: {
    prop: 'srFreight',
    type: Number,
  },
  OrderFreight: {
    prop: 'orderFreight',
    type: Number,
  },
  TruckType: {
    prop: 'truckType',
    type: String,
  },
  DeliveryDate: {
    prop: 'deliveryDate',
    type: Date,
  },
  TransportStatus: {
    prop: 'transportStatus',
    type: String,
  },
  OrderStatus: {
    prop: 'orderStatus',
    type: String,
  },
  FinancialStatus: {
    prop: 'financialStatus',
    type: String,
  },
  PONumber: {
    prop: 'poNumber',
    type: String,
  },
  GrossWeight: {
    prop: 'weight',
    type: Number,
  },
  TSM: {
    prop: 'TSM',
    type: String,
  },
  SRHeaderComment: {
    prop: 'srHeaderComment',
    type: String,
  },
  OrderHeaderComment: {
    prop: 'orderHeaderComment',
    type: String,
  },
};

const date = new Date();
const preOrder = `precierre`;
// const preOrder = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;

@Controller('file')
export class ReadFileController {
  @Get('read')
  getFile() {
    // return readXlsxFile('./file/Programa 13 de agosto.xlsx', { propsMap });
    return readXlsxFile(`./file/${preOrder}.xlsx`, { schema });
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './file',
        filename: (req, file, cb) => {
          try {
            unlinkSync(`./file/precierre.xlsx`);
          } catch (error) {
            console.error(error);
          }
          return cb(null, `${preOrder}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {}
}
