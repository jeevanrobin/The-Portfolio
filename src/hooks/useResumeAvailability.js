import { useEffect, useState } from "react";
import { withBase } from "../lib/paths";

export default function useResumeAvailability() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(withBase("resume.pdf"))
      .then(res => {
        const type = res.headers.get("content-type") || "";
        if (active && res.ok && type.includes("application/pdf")) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return available;
}
