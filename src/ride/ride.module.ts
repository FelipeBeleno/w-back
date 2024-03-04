import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { DriverService } from 'src/driver/driver.service';
import { Driver, DriverSchema } from 'src/driver/entities/driver.entity';
import { Ride, RideSchema } from './entities/ride.entity';

@Module({
  imports: [

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Driver.name,
        schema: DriverSchema
      },
      {
        name: Ride.name,
        schema: RideSchema
      }
    ])

  ],
  controllers: [RideController],
  providers: [RideService, DriverService],
  exports:[RideService]
})
export class RideModule { }
