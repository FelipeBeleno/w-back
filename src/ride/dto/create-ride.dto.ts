import { IsEmail, IsLatitude, IsLongitude } from "class-validator";


export class CreateRideDto {

    @IsEmail()
    userEmail: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;

    @IsLatitude()
    latitudeEnd: number;

    @IsLongitude()
    longitudeEnd: number;

}
