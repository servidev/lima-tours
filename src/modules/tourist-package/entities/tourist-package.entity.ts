import { Reservation } from '@/modules/reservation/entities/reservation.entity';
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
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  duracion: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  disponibilidad: number;

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
    this.nombre = this.nombre.toUpperCase();
  }

  @OneToMany(() => Reservation, (reservation) => reservation.touristPackage)
  reservations: Reservation[];
}
