import React from "react";
import Delete from "./ui/Delete";

interface Appointment {
  _id: string;
  patient: {
    name: string;
    surname: string;
    dni: string;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  description: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-full max-w-full max-h-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Detalles del turno
        </h2>
        <Delete id={appointment._id} />
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
