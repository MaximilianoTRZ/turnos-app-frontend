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
    <div className="flex w-full justify-center text-center">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New Appointment</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col ">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                required={true}
                placeholder="Enter your full name"
                value={formData.name}
                className="m-2 bg-slate-400 p-2 rounded-md "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                type="text"
                name="surname"
                onChange={handleChange}
                required={true}
                placeholder="Enter your surname"
                value={formData.surname}
                className="m-2 bg-slate-400 p-2 rounded-md"
              />
            </div>
          </div>
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            type="text"
            name="dni"
            onChange={handleChange}
            required={true}
            placeholder="Enter your DNI"
            value={formData.dni}
            className="m-2 bg-slate-400 p-2 rounded-md"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            required={true}
            placeholder="Enter your email"
            value={formData.email}
            className="m-2 bg-slate-400 p-2 rounded-md"
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            onChange={handleChange}
            required={true}
            placeholder="Enter your phone number"
            value={formData.phone}
            className="m-2 bg-slate-400 p-2 rounded-md"
          />
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                onChange={handleChange}
                required={true}
                value={formData.date}
                className="m-2 bg-slate-400 p-2 rounded-md w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                name="time"
                onChange={handleChange}
                required={true}
                value={formData.time}
                className="m-2 bg-slate-400 p-2 rounded-md w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="reason">Reason</label>
            <input
              id="reason"
              type="text"
              name="reason"
              onChange={handleChange}
              required={true}
              placeholder="Enter the reason for your appointment"
              value={formData.reason}
              className="m-2 bg-slate-400 p-2 rounded-md"
            />
          </div>
        </div>
        <input
          type="submit"
          value={"Get your Appointment"}
          className="bg-purple-400 hover:bg-purple-200 text-default-text"
        />
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};
export default Form;
