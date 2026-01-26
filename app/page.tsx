"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/registration");
    },4000);
  },[]);
  
  return (
    <div className="welcome-screen">
      <div className="welcome-text">
        Welcome My Friend!
      </div>
    </div>
  );
}
