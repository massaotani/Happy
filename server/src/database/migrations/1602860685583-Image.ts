import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Image1602860685583 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
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
                    name: 'path',
                    type: 'varchar'
                },
                // Como o relacionamento de Orfanatos e Imagens é de 1:N, salva-se um campo para armazenar os id dos orfanatos
                {
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            // No caso, a coluna orphanage_id é uma FK, então deve-se adicionar:
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages', // A qual tabela a FK faz referencia?
                    referencedColumnNames: ['id'], // A qual coluna essa FK se liga na outra tabela?
                    onUpdate: 'CASCADE', // Se o obj mudar, a FK faz as referencias à ele mudarem também
                    onDelete: 'CASCADE' // Se o obj for deletado, deleta-se as referencias também.
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
