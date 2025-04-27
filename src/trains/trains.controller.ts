// src/trains/trains.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrainsService } from './trains.service';

@Controller('trains')
export class TrainsController {
    constructor(private readonly trainsService: TrainsService) { }

    @Post()
    async update(@Body() data: { id: string; lat: number; lon: number }) {
        return this.trainsService.updatePosition(data.id, data.lat, data.lon);
    }

    @Get()
    async getAll() {
        return this.trainsService.getAll();
    }
}