import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './entities/driver.entity';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Ride } from 'src/ride/entities/ride.entity';
import * as dayjs from 'dayjs';
import { RideService } from 'src/ride/ride.service';
import configuration from 'config/configuration';
import { HttpCustomService } from 'src/provider/http.service';
import { NewPay } from 'interfaces/newPay';

@Injectable()
export class DriverService {

  constructor(
    @InjectModel(Driver.name)
    private readonly driverModel: Model<Driver>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Ride.name)
    private readonly rideModel: Model<Ride>,
    private readonly httpCustom: HttpCustomService,
  ) {
  }

  async findOneDriver() {
    return await this.driverModel.findOne({ available: true });
  }


  async updateDriverRide(user: string) {
    await this.driverModel.findByIdAndUpdate(user, { available: false });
    return
  }

  async getDriverInfo(id: string) {

    const { name, lastName } = await this.userModel.findById(id)

    return `${name} ${lastName}`

  }


  async finishRide(id: mongoose.Types.ObjectId) {

    let ride = await this.rideModel.findById(id).lean();

    if (!ride) throw new BadRequestException('Ride does not exist');

    const driver = await this.getDriverInfo(ride.userDriver);

    if (ride.finish || ride.totalAmount) {
      return {
        user: ride.userEmail,
        date: dayjs(ride.createdAt).format('DD/MM/YYYY h:mm:ss A'),
        driver,
        initialPosition: `Latitude: ${ride.latitude}, Longitude: ${ride.longitude}`,
        finalPosition: `Latitude: ${ride.latitudeEnd}, Longitude: ${ride.longitudeEnd}`,
        kms: ride.kms,
        value: ride.totalAmount ? ride.totalAmount : 0,
        state: ride.status[ride.status.length - 1].state,
        finish: dayjs(ride.finish).format('DD/MM/YYYY h:mm:ss A'),
        minutes: ride.totalMinutes
      }
    }

    let valueKm = ride.kms * 1000;

    let initialDate = dayjs(ride.createdAt);

    let finishDate = dayjs(new Date());

    let minuts = finishDate.diff(initialDate, "minutes")

    let valueMinutes = minuts * 200;

    let amountFinal = valueKm + valueMinutes + 3500

    ride = {
      ...ride,
      status: [...ride.status,
      {
        state: 'finished',
        createdAt: new Date()
      }
      ],
      totalAmount: amountFinal,
      finish: new Date()
    }

    await this.createdTransaction(amountFinal, ride.userEmail);

    await this.rideModel.findByIdAndUpdate(ride._id, ride);

    await this.driverModel.findByIdAndUpdate(ride.userDriver, {available: true})


    return {
      user: ride.userEmail,
      date: dayjs(ride.createdAt).format('DD/MM/YYYY h:mm:ss A'),
      driver,
      initialPosition: `Latitude: ${ride.latitude}, Longitude: ${ride.longitude}`,
      finalPosition: `Latitude: ${ride.latitudeEnd}, Longitude: ${ride.longitudeEnd}`,
      kms: ride.kms,
      value: ride.totalAmount ? ride.totalAmount : 0,
      state: ride.status[ride.status.length - 1].state,
      finish: dayjs(ride.finish).format('DD/MM/YYYY h:mm:ss A') ,
      minutes: minuts
    }



  }


  async createdTransaction(value: number, emailClient) {

    const body: NewPay = {
      "amount_in_cents": Number(value.toString() + '00'), // Monto en centavos
      "currency": "COP", // Moneda
      "customer_email": emailClient, // Email del usuario
      "payment_method": {
        "installments": 2 // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
      },
      "reference": `${new Date().getTime()}`, // Referencia única de pago
      "payment_source_id": configuration().ID_SOURCE, // ID de la fuente de pago (obligatorio)
      "recurrent": true // Recurrente
    }


    return await this.httpCustom.createTransaction(body)

  }


}
