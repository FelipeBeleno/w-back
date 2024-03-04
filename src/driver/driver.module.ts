import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './entities/driver.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Ride, RideSchema } from 'src/ride/entities/ride.entity';
import { HttpCustomService } from 'src/provider/http.service';
import { ProviderModule } from 'src/provider/provider.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Ride.name,
        schema: RideSchema
      }
    ]),
    ProviderModule
  ],
  controllers: [DriverController,],
  providers: [DriverService],
  exports: [DriverService]
})
export class DriverModule { }
