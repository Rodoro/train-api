import { Module } from '@nestjs/common';
import { TrainsModule } from './trains/trains.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TrainsModule,
  ],
})
export class AppModule { }
