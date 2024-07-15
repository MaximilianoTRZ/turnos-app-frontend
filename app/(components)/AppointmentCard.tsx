import React from "react";
import Delete from "./ui/Delete";

interface Appointment {
  name: string;
  surname: string;
  dni: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  description: string;
  id: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Detalles del turno
        </h2>
        <Delete id={appointment.id} />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <strong>Nombre:</strong> {appointment.name}
        </div>
        <div>
          <strong>Apellido:</strong> {appointment.surname}
        </div>
        <div>
          <strong>DNI:</strong> {appointment.dni}
        </div>
        <div>
          <strong>Email:</strong> {appointment.email}
        </div>
        <div>
          <strong>Teléfono:</strong> {appointment.phone}
        </div>
        <div>
          <strong>Fecha:</strong> {appointment.date}
        </div>
        <div>
          <strong>Hora:</strong> {appointment.time}
        </div>
        <div>
          <strong>Motivo:</strong> {appointment.description}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
