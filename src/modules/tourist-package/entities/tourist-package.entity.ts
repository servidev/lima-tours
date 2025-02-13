import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'tourist_packages' })
export class TouristPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  duration: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  availability: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  //! NOMBRE DE PAQUETE SERÁ SIEMPRE EN MAYÚSCULAS
  @BeforeInsert()
  @BeforeUpdate()
  fnUpperCase() {
    this.name = this.name.toUpperCase();
  }

  @OneToMany(() => Reservation, (reservation) => reservation.touristPackage)
  reservations: Reservation[];
}
