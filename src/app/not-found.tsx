"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  if (pathname === "/general-product1/" || pathname === "/general-product1")
    redirect("/general-product");
  if (pathname.endsWith("/"))
    redirect(pathname.slice(0, -1));
  return <>
    <div>
      <h1>404 Not Found</h1>
      <p>3초 후 홈을 이동합니다.</p>
    </div>
  </>;
}