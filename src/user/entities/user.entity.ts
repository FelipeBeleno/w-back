import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({
        type: String,
        isRequired: true
    })
    name: string;

    @Prop({
        type: String,
        isRequired: true
    })
    lastName: string;


    @Prop({
        type: String,
        enum: ['rider', 'driver'],
        isRequired: true
    })
    role: string;

    @Prop({
        type: String
    })
    email: string;

    @Prop({
        type: String
    })
    tokenCard: string;

    @Prop({
        type: String
    })
    tokenNequi: string;


}



export const UserSchema = SchemaFactory.createForClass(User);