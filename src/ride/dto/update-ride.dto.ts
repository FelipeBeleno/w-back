import { PartialType } from '@nestjs/swagger';
import { CreateRideDto } from './create-ride.dto';
import { IsDate, IsInt, IsLatitude, IsLongitude, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { State } from 'interfaces/state';



class StateDto {

    @IsString()
    state: string;

    @IsDate()
    createdAt: Date;

}


export class UpdateRideDto extends PartialType(CreateRideDto) {


    @IsMongoId()
    userDriver: string;

    @ValidateNested()
    @Type(() => StateDto)
    status: State


    @IsDate()
    createdAt: Date

    @IsDate()
    finish: Date

    @IsInt()
    totalAmount: number

    @IsInt()
    kms: number

    @IsInt()
    totalMinutes: number

}
