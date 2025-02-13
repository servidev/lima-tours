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
  clientfullName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  dateReservation: Date;

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
