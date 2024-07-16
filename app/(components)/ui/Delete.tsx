"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Delete = ({ _id }: { _id: string }) => {
  const router = useRouter();

  const deleteTurn = async () => {
    const res = await fetch(
      `http://localhost:3001/api/entity/appointment/${_id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <button onClick={deleteTurn} className="btn btn-danger">
      <Image src="/delete.svg" alt="X" width={20} height={20} />
    </button>
  );
};

export default Delete;
