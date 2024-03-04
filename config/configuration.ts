import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
    envFilePath: `.development.env`,
    isGlobal: true,
})

const configService = new ConfigService()

export default () => ({

    database: {
        conection: configService.get('MONGO_URL')
    },
    URL_W_SANDBOX: configService.get('URL_W_SANDBOX'),
    PUBLIC_KEY: configService.get('PUBLIC_KEY'),
    PRIVATE_KEY: configService.get('PRIVATE_KEY'),
    ACEPTANCE_TOKEN: configService.get('ACEPTANCE_TOKEN'),
    SIGNATURE: configService.get('SIGNATURE'),
    ID_SOURCE: configService.get('ID_SOURCE'),

});