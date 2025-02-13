import { TouristPackage } from 'src/modules/tourist-package/entities/tourist-package.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_nombre: string;

  @Column()
  email: string;

  @Column({ length: 9 })
  telefono: string;

  @Column()
  fecha_reserva: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(
    () => TouristPackage,
    (touristPackage) => touristPackage.reservations,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  touristPackage: TouristPackage;
}
