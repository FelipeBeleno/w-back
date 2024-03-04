import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { State } from "interfaces/state";
import { Document, Types } from "mongoose";



@Schema()
export class Ride extends Document {

    @Prop({
        type: Number,
        isRequired: true
    })
    latitude: number;

    @Prop({
        type: Number,
        isRequired: true
    })
    longitude: number;

    @Prop({
        type: String,
        isRequired: true
    })
    userEmail: string;

    @Prop({
        type: Types.ObjectId,
        isRequired: true
    })
    userDriver: string;

    @Prop({
        type: Number,
        isRequired: true
    })
    latitudeEnd: number;

    @Prop({
        type: Number,
        isRequired: true
    })
    longitudeEnd: number;

    @Prop([{
        state: {
            type: String,
            enum: ["start", "in progress", "finished"]
        },
        createdAt: Date
    }])
    status: State[]

    @Prop({
        type: Date
    })
    createdAt: Date

    @Prop({
        type: Date
    })
    finish: Date

    @Prop({
        type: Number,
        default: 0
    })
    totalAmount: number

    @Prop({
        type: Number,
        default: 0
    })
    totalMinutes: number

    @Prop({
        type: Number,
        default: 0
    })
    kms: number

}



export const RideSchema = SchemaFactory.createForClass(Ride)