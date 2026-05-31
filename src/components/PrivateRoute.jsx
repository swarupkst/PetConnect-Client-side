"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return children;
}