import Project from "@component/components/project";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const redirect = () => {
    router.push("create");
    return null;
  };

  return (
    <div>
      <h1>Welcome to Collab</h1>
      <h2>Projects</h2>
      <ul>{/* list of project tiles */}</ul>

      <button onClick={redirect}>Create New Project</button>
    </div>
  );
}
