"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Delete = ({ _id, onDelete }: { _id: string; onDelete: () => void }) => {
  const router = useRouter();

  const softDeleteTurn = async () => {
    const res = await fetch(
      `http://localhost:3001/api/entity/appointment/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Appointment: {
            status: "CANCELLED",
          },
        }),
      }
    );
    if (res.ok) {
      onDelete(); // Call the passed callback function
      router.refresh();
    }
  };

  return (
    <button onClick={softDeleteTurn} className="btn btn-danger">
      <Image src="/delete.svg" alt="X" width={20} height={20} />
    </button>
  );
};

export default Delete;
