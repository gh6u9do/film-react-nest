import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


// описываем схему для поддокумента расписания
@Schema()
export class Schedule {
    @Prop({required: true})
    id: string

    @Prop({required: true, type: String})
    daytime: string

    @Prop({required: true})
    hall:number

    @Prop({required: true})
    rows: number

    @Prop({required: true})
    seats: number

    @Prop({required: true})
    price: number

    @Prop([String])
    taken: string[]
}   


// описываем схему для документа фильма
@Schema()
export class Film {
    @Prop({required: true, unique: true})
    id: string

    @Prop({required: false})
    rating?: number

    @Prop({required: false})
    director?: string

    @Prop({type: [String], required: false})
    tags?: string[]

    @Prop({required: false})
    image?: string

    @Prop({required: false})
    cover?: string

    @Prop({required: false})
    title?: string

    @Prop({required: false})
    about?: string

    @Prop({required: false})
    description?: string

    @Prop({ type: [Schedule] }) 
    schedule: Schedule[]
}

// экспортируем тип того что реально возвращает Mongo
export type FilmDocument = HydratedDocument<Film>;
// крафтим схему для документа с фильмами
export const FilmSchema = SchemaFactory.createForClass(Film);