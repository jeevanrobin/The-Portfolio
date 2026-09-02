import { useEffect, useState } from "react";

export default function useResumeAvailability() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`${import.meta.env.BASE_URL}resume.pdf`)
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
