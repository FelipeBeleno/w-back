import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import configuration from 'config/configuration';
import { NewPay } from 'interfaces/newPay';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    public async createTransaction(body: NewPay) {

        try {

            ///

            const response = await firstValueFrom(this.httpService.post(
                `${configuration().URL_W_SANDBOX}/v1/transactions`,
                body,
                {
                    headers: {
                        'authorization': `Bearer ${configuration().PRIVATE_KEY}`
                    }
                }
            ))


            return response
        } catch (error) {
             throw new BadRequestException(error)
        }

    }
}
