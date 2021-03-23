import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductValues1611402558827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO product (title, description, price, currency, image)
            VALUES
            (
                'Cyberpunk 2077',
                'Cyberpunk 2077 is a 2020 action role-playing video game developed and published by CD Projekt',
                99.00,
                'USD',
                'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg'
            ),
            (
                'Horizon Zero Dawn',
                'Horizon Zero Dawn is a 2017 action role-playing game developed by Guerrilla Games and published by Sony Interactive Entertainment',
                49.99,
                'USD',
                'https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg'
            ),
            (
                'Resident Evil 2 Remaster',
                'Resident Evil 2 is a 2019 survival horror game developed and published by Capcom. A remake of the 1998 game of the same name',
                39.99,
                'USD',
                'https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_2_Remake.jpg'
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
