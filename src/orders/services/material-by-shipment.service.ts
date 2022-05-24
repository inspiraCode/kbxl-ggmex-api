import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateMaterialByShipmentDto,
  UpdateMaterialByShipmentDto,
} from '../dto/material-by-shipment.dto';
import { MaterialByShipment } from '../entities/material-by-shipment.entity';
import { ShipmentByOrder } from '../entities/shipment-by-order.entity';

@Injectable()
export class MaterialByShipmentService {
  constructor(
    @InjectRepository(MaterialByShipment)
    private materialByShipmentRepo: Repository<MaterialByShipment>,
    @InjectRepository(ShipmentByOrder)
    private shipmentByOrdersRepo: Repository<ShipmentByOrder>,
  ) {}

  findAll() {
    return this.materialByShipmentRepo.find();
  }

  async findOne(id: number) {
    const materialByShipment = await this.materialByShipmentRepo.findOne(id);
    if (!materialByShipment) {
      throw new NotFoundException(`MaterialShipment #${id} not found.`);
    }
    return materialByShipment;
  }

  async create(createData: CreateMaterialByShipmentDto) {
    const newMaterilByshipment = await this.materialByShipmentRepo.create(
      createData,
    );

    if (createData.shipmentByOrderId) {
      const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(
        createData.shipmentByOrderId,
      );
      newMaterilByshipment.shipmentByOrder = shipmentByOrder;
    }

    return this.materialByShipmentRepo.save(newMaterilByshipment);
  }

  async update(id: number, updateData: UpdateMaterialByShipmentDto) {
    const updateMaterilByshipment = await this.materialByShipmentRepo.findOne(
      id,
    );

    if (updateData.shipmentByOrderId) {
      const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(
        updateData.shipmentByOrderId,
      );
      updateMaterilByshipment.shipmentByOrder = shipmentByOrder;
    }

    this.materialByShipmentRepo.merge(updateMaterilByshipment, updateData);

    return this.materialByShipmentRepo.save(updateMaterilByshipment);
  }

  remove(id: number) {
    return this.materialByShipmentRepo.delete(id);
  }
}
