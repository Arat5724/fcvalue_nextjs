"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return <>
    <main>
      <h1>404 Not Found</h1>
      <p>3초 후 홈을 이동합니다.</p>
    </main>
  </>;
}