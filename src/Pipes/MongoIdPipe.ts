import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';


@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {

    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid param not is mongoId');
    }
    return value;
  }
}