import { Module } from '@nestjs/common';
import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.service';
import { TrainsGateway } from './trains.gateway';

@Module({
    controllers: [TrainsController],
    providers: [TrainsService, TrainsGateway],
})
export class TrainsModule { }