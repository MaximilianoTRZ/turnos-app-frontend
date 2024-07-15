"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Delete = ({ id }: { id: string }) => {
  const router = useRouter();

  const deleteTurn = async () => {
    const res = await fetch(
      `http://localhost:3001/api/entity/appointment/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button onClick={deleteTurn} className="btn btn-danger">
      <Image src="/delete.svg" alt="X" width={20} height={20} />
    </button>
  );
};

export default Delete;
