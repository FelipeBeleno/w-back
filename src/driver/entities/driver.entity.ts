import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema({
    timestamps: true
})

export class Driver extends Document {

    @Prop({
        type: Types.ObjectId,
        isRequired: true
    })
    user: string;


    @Prop({
        type: Boolean,
        default: true
    })
    available: boolean;

}



export const DriverSchema = SchemaFactory.createForClass(Driver);


