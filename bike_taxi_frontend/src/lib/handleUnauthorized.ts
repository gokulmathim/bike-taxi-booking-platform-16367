"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useHandleUnauthorized(errorMessage?: string) {
  const router = useRouter();
  useEffect(() => {
    if (errorMessage && /unauthorized|401|forbidden/i.test(errorMessage)) {
      router.replace("/login");
    }
  }, [errorMessage, router]);
}
