"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  [key: string]: string;
}

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:3001/api/turno/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: formData }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Obtener un nuevo turno
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="name" className="text-gray-600">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                required
                placeholder="Ingresa tu nombre"
                value={formData.name}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="surname" className="text-gray-600">
                Apellido
              </label>
              <input
                id="surname"
                type="text"
                name="surname"
                onChange={handleChange}
                required
                placeholder="Ingresa tu apellido"
                value={formData.surname}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="dni" className="text-gray-600">
              DNI
            </label>
            <input
              id="dni"
              type="text"
              name="dni"
              onChange={handleChange}
              required
              placeholder="Ingresa tu DNI"
              value={formData.dni}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Ingresa tu email"
              value={formData.email}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-600">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              onChange={handleChange}
              required
              placeholder="Ingresa tu número de teléfono"
              value={formData.phone}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="date" className="text-gray-600">
                Fecha
              </label>
              <input
                id="date"
                type="date"
                name="date"
                onChange={handleChange}
                required
                value={formData.date}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="time" className="text-gray-600">
                Hora
              </label>
              <input
                id="time"
                type="time"
                name="time"
                onChange={handleChange}
                required
                value={formData.time}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="reason" className="text-gray-600">
              Motivo
            </label>
            <input
              id="reason"
              type="text"
              name="reason"
              onChange={handleChange}
              required
              placeholder="Ingresa el motivo de tu consulta"
              value={formData.reason}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <input
            type="submit"
            value="Obten tu turno"
            className="mt-6 bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition-colors duration-200"
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};
export default Form;
