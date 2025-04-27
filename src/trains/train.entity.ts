import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Train {
    @PrimaryColumn()
    id: string;

    @Column('float')
    lat: number;

    @Column('float')
    lon: number;

    @Column({ default: 'on_time' })
    status: string;
}