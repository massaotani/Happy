import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image'

@Entity('orphanages')
export default class Orphanage{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;
    
    @Column()
    longitude: number;
    
    @Column()
    about: string;
    
    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    // Primeiro parametro: Função que devolve tipo do retorno
    // Segundo param: Dado uma imagem que eu recebi, qual que é o campo que retorna o relacionamento inverso?
    // Terceiro param: Configurações
    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert','update']
    })
    @JoinColumn({ name: 'orphanage_id'})
    images: Image[];
}