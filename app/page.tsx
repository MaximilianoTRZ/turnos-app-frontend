import Link from "next/link";
import Form from "./(components)/Form";

export default function Home() {
  return (
    <div className="mb-4 ">
      <Link href="/VerTurnos">
        <div className="flex justify-center m-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Ver turnos
        </div>
      </Link>
      <Form />
    </div>
  );
}
