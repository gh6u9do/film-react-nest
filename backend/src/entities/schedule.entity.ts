import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Film } from "./film.entity";

@Entity({name: 'schedules'})
export class Schedule {
    @PrimaryColumn({type: 'uuid', nullable: false})
    id: string

    @Column({type: 'varchar'})
    daytime: string;

    @Column({type: 'int'})
    hall: number;

    @Column({type: 'int'})
    rows: number;

    @Column({type: 'int'})
    seats: number;

    @Column({type: 'double precision'})
    price: number;

    @Column({type: 'text'})
    taken: string;

    @Column({type: 'uuid'})
    filmId: string;

    @ManyToOne(() => Film, film => film.schedules)
    @JoinColumn({name: 'filmId'})
    film: Film;
}