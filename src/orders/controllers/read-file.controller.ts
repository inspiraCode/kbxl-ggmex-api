import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import readXlsxFile = require('read-excel-file/node');

const satData = `satMaterialData`;
const preOrder = `precierre`;
// const preOrder = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;

@Controller('file')
export class ReadFileController {
  // @Get('read')
  // getFile() {
  //   // return readXlsxFile('./file/Programa 13 de agosto.xlsx', { propsMap });
  //   return readXlsxFile(`./file/${preOrder}.xlsx`, { schema });
  // }

  @Get('read/:fileType')
  getSatFile(@Param('fileType') fileType: string) {
    const schema = {
      ShipmentNumber: {
        prop: 'shipmentNumber',
        type: String,
      },
      ShDNumber: {
        prop: 'shDNumber',
        type: String,
      },
      Destination: {
        prop: 'destination',
        type: String,
      },
      ClaveSAT: {
        prop: 'claveSAT',
        type: String,
      },
      DescSAT: {
        prop: 'descripcionSAT',
        type: String,
      },
      Laminas: {
        prop: 'laminas',
        type: Number,
      },
      Paquetes: {
        prop: 'paquetes',
        type: Number,
      },
      PesoNeto: {
        prop: 'pesoNeto',
        type: Number,
      },
      PesoBruto: {
        prop: 'pesoBruto',
        type: Number,
      },
    };
    if (fileType === 'material') {
      return readXlsxFile(`./filesat/${satData}.xlsx`, { schema });
    } else {
      const schema = {
        AppointmentDate: {
          prop: 'appointmentDate',
          type: String,
        },
        ShDNumber: {
          prop: 'shDNumber',
          type: String,
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
          type: String,
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
      return readXlsxFile(`./file/${preOrder}.xlsx`, { schema });
    }
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './file',
        filename: (req, file, cb) => {
          try {
            unlinkSync(`./file/${preOrder}.xlsx`);
          } catch (error) {
            console.error(error);
          }
          return cb(null, `${preOrder}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    files;
  }
  @Post('satupload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './filesat',
        filename: (req, file, cb) => {
          try {
            unlinkSync(`./filesat/${satData}.xlsx`);
          } catch (error) {
            console.error(error);
          }
          return cb(null, `${satData}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadSatFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    files;
  }
}
