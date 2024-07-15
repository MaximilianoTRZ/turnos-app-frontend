"use client";
import React, { useEffect, useState } from "react";
import AppointmentCard from "@/app/(components)/AppointmentCard";
import Link from "next/link";

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

const App = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/entity/appointment"
        );
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

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 gap-4">
      <Link href="/">
        <div className="text-blue-500 hover:underline">Volver al inicio</div>
      </Link>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default App;
