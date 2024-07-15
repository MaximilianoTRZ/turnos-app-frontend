import Link from "next/link";
import Form from "./(components)/Form";

export default function Home() {
  return (
    <div className="mb-4">
      <Link href="/VerTurnos">
        <div className="text-blue-500 hover:underline">Ver turnos</div>
      </Link>
      <Form />
    </div>
  );
}
