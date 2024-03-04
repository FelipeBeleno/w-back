import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { DriverService } from 'src/driver/driver.service';
import { Ride } from './entities/ride.entity';
import * as  dayjs from 'dayjs';
import { haversine } from 'src/helpers/haversine';
import { Observable } from 'rxjs';
import { GetTransformData } from 'interfaces/transformData';

@Injectable()
export class RideService {



  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Ride.name)
    private readonly rideModel: Model<Ride>,
    private readonly driverService: DriverService
  ) { }



  async create(createRideDto: CreateRideDto) {

    try {

      const respo = await this.findCurrentRide(createRideDto.userEmail);

      if (!respo) throw new BadRequestException('Ride in progress');

      const userRider = await this.findOneRider(createRideDto.userEmail);

      if (!userRider) throw new BadRequestException('Unregistered not found');

      const riderAsing = await this.driverService.findOneDriver();

      if (!riderAsing) throw new BadRequestException('Our drivers are busy, give us a moment');

      const riderNew = await this.rideModel.create({
        ...createRideDto,
        userDriver: riderAsing.user,
        createdAt: new Date(),
        status: [{
          state: 'in progress',
          createdAt: new Date()
        }],
        kms: haversine(createRideDto.latitude, createRideDto.longitude, createRideDto.latitudeEnd, createRideDto.longitudeEnd)
      })

      await riderNew.save()

      await this.driverService.updateDriverRide(riderAsing.user)

      return riderNew;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findCurrentRide(email: string) {

    const response = await this.rideModel.find({ userEmail: email })

    if (response.length === 0) return true

    const elem = response[response.length - 1]

    const status = elem.status[elem.status.length - 1].state === 'finished' ? true : false;

    return status

  }
  async findOneRider(email: string) {

    return await this.userModel.findOne({ email, role: 'rider' }).lean();
  }



  async getRideCurrent(id: mongoose.Types.ObjectId): Promise<GetTransformData> {

    const response = await this.rideModel.findById(id).lean();


    if (!response) throw new BadRequestException('Ride does not exist')

    const driver = await this.driverService.getDriverInfo(response.userDriver);

    return {
      user: response.userEmail,
      date: dayjs(response.createdAt).format('DD/MM/YYYY h:mm:ss A'),
      driver,
      initialPosition: `Latitude: ${response.latitude}, Longitude: ${response.longitude}`,
      finalPosition: `Latitude: ${response.latitudeEnd}, Longitude: ${response.longitudeEnd}`,
      kms: response.kms,
      value: response.totalAmount ? response.totalAmount : 0,
      state: response.status[response.status.length - 1].state
    }

  }


}
