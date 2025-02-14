import { format } from 'date-fns';

export class ReservationEmailDTO {
  email: string;
  fecha_reserva: Date;
}

export class TouristPackageEmailDTO {
  nombre: string;
}

export const getReservationEmailBody = (
  reservation: ReservationEmailDTO,
  touristPackage: TouristPackageEmailDTO,
) => {
  return {
    to: reservation.email,
    subject: 'Reserva registrada',
    text: `Tu reserva para ${touristPackage.nombre} ha sido registrada. Fecha: ${format(reservation.fecha_reserva, 'dd-MM-yyyy')}`,
    html: `<p>Tu reserva para <strong>${touristPackage.nombre}</strong> ha sido registrada.</p><p>La fecha de reserva es <strong>${format(reservation.fecha_reserva, 'dd-MM-yyyy')}</strong></p>`,
  };
};
