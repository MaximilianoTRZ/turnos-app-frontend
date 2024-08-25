"use client";
import React, { useEffect, useState } from "react";
import AppointmentCard from "@/app/(components)/AppointmentCard";
import Link from "next/link";

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

const App = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/turno/consultar");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments data");
      }
      const data: Appointment[] = await response.json();
      setAppointments(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = () => {
    fetchAppointments(); // Refresh the appointment list
  };

  if (loading) {
    return (
      <div className="flex justify-center justify-center items-center text-center items-center min-h-screen ">
        <div className="flex bg-cyan-100 border-cyan-600 border-2 rounded-lg shadow-xl justify-center items-center min-w-40 min-h-40 ">
          <h2 className="text-xl font-bold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center justify-center items-center text-center items-center min-h-screen">
        <div className="flex bg-red-100 border-red-600 border-2 rounded-lg shadow-xl justify-center items-center min-w-40 min-h-40 ">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col justify-center min-h-screen items-center gap-4">
        <button className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"></button>
        <div className="flex flex-row justify-center items-center gap-4 w-full h-full max-w-full max-h-full p-5">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
