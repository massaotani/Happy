import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Orphanages1602828717435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // REALIZAR ALTERAÇÕES NO BD
        await queryRunner.createTable(new Table({ 
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, // Não pode ser negativo,
                    isPrimary: true, // Primary Key
                    isGenerated: true, // Gerada automaticamente
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10, // Casas depois da vírgula
                    precision: 2 // Casas antes da vírgula
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10, // Casas depois da vírgula
                    precision: 2 // Casas antes da vírgula
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // DESFAZER O QUE FOI FEITO NO UP
        await queryRunner.dropTable('orphanages');
    }

}
