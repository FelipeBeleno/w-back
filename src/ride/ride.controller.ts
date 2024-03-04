import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/Pipes/MongoIdPipe';
import mongoose from 'mongoose';

@ApiTags('Ride')
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) { }

  @Post('request')
  @ApiBody({
    type: CreateRideDto,
    examples: {
      ab: {
        summary: "Request Ride",
        description: "Create a Ride",
        value: {
          latitude: "4.734917999718997",
          longitude: "-74.08223406754928",
          userEmail: "mail@rider.com",
          latitudeEnd: "4.759039229839604",
          longitudeEnd: "-74.09643904636894",
           
        }
      }
    }
  })

  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Check ride by id',
    type: String,
    required: true,
    example: '5f1234567890ab1234567890',
  })
  @UsePipes(MongoIdPipe)
  getRide(@Param('id') id: mongoose.Types.ObjectId) {

    
    return this.rideService.getRideCurrent(id)
  }

}
