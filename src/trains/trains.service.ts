// src/trains/trains.service.ts
import { Injectable } from '@nestjs/common';
import { Train } from 'prisma/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainsService {
    constructor(private prisma: PrismaService) { }

    async updatePosition(id: string, lat: number, lon: number): Promise<Train> {
        return this.prisma.train.upsert({
            where: { id },
            update: { lat, lon },
            create: { id, lat, lon },
        });
    }

    async getAll(): Promise<Train[]> {
        return this.prisma.train.findMany();
    }
} 
