import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/Pipes/MongoIdPipe';
import mongoose from 'mongoose';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {

  constructor(private readonly driverService: DriverService) { }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Finish ride by id',
    type: String,
    required: true,
    example: '5f1234567890ab1234567890',
  })
  @UsePipes(MongoIdPipe)
  finishRide(@Param('id') id: mongoose.Types.ObjectId) {

    return this.driverService.finishRide(id)

  }

}
