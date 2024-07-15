"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

// Define the schema using Zod
const formDataSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nombre debe tener al menos 2 caracteres" })
    .nonempty({ message: "Nombre es requerido" }),
  surname: z
    .string()
    .min(2, { message: "Apellido debe tener al menos 2 caracteres" })
    .nonempty({ message: "Apellido es requerido" }),
  dni: z
    .string()
    .length(8, { message: "DNI debe tener 8 caracteres" })
    .nonempty({ message: "DNI es requerido" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .nonempty({ message: "Email es requerido" }),
  phone: z
    .string()
    .min(10, { message: "Teléfono debe tener al menos 10 caracteres" })
    .nonempty({ message: "Teléfono es requerido" }),
  date: z.string().nonempty({ message: "Fecha es requerida" }),
  time: z.string().nonempty({ message: "Hora es requerida" }),
  reason: z
    .string()
    .min(5, { message: "Motivo debe tener al menos 5 caracteres" })
    .nonempty({ message: "Motivo es requerido" }),
});

interface FormData {
  [key: string]: string;
}

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    dni: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    // Validate form data
    const validationResult = formDataSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error.errors.map((err) => err.message));
      return;
    }

    const res = await fetch("http://localhost:3001/api/turno/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: validationResult.data }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors([data.message]);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Obtener un nuevo turno
        </h1>
        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-700">
          Detalles del paciente
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
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
              <label htmlFor="surname" className="text-gray-600 ml-2">
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
                className="mt-2 ml-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="dni" className="text-gray-600">
              DNI
            </label>
            <input
              id="dni"
              type="number"
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

          <h2 className="text-xl font-bold mt-8 mb-4 text-gray-700">
            Detalles del turno
          </h2>

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
            <textarea
              id="reason"
              name="reason"
              onChange={handleChange}
              required
              placeholder="Ingresa el motivo de tu turno"
              value={formData.reason}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <input
            type="submit"
            value="Obten tu turno"
            className="mt-6 bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition-colors duration-200"
          />
          {errors.length > 0 && (
            <div className="text-red-500 mt-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
