import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { RideModule } from './ride/ride.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import configuration from 'config/configuration';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.development.env`,
      isGlobal: true,

    }),
    MongooseModule.forRoot(configuration().database.conection)

    , DriverModule, RideModule, UserModule, ],
  controllers: [],
  providers: [],
})
export class AppModule { }
