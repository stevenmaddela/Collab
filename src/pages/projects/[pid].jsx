import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Manage() {
  const router = useRouter();
  const { pid } = router.query;
  return <h1>{pid}</h1>;
}
