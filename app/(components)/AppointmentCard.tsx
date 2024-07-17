import React from "react";
import Delete from "./ui/Delete";

interface Appointment {
  patient: {
    _id: string;
    name: string;
    surname: string;
    dni: number;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  description: string;
  _id: string;
  status: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: () => void;
}
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-full max-w-full max-h-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Detalles del turno
        </h2>
        <Delete _id={appointment._id} onDelete={onDelete} />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <strong>Nombre:</strong> {appointment.patient.name}
        </div>
        <div>
          <strong>Apellido:</strong> {appointment.patient.surname}
        </div>
        <div>
          <strong>DNI:</strong> {appointment.patient.dni}
        </div>
        <div>
          <strong>Email:</strong> {appointment.patient.email}
        </div>
        <div>
          <strong>Teléfono:</strong> {appointment.patient.phone}
        </div>
        <div>
          <strong>Fecha:</strong> {appointment.date.substring(0, 10)}
        </div>
        <div>
          <strong>Hora:</strong> {appointment.date.substring(11, 16)}
        </div>
        <div>
          <strong>Motivo:</strong> {appointment.description}
        </div>
        <div>
          <strong>Estado: </strong>
          {appointment.status}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
