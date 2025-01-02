"use client"; // Error boundaries must be Client Components

import { IS_LOCAL } from "@/utils/config";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // send slack message

    if (IS_LOCAL) {
      return;
    }

    fetch("/api/contact", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: "Error",
        name: error.name,
        msg: `${error.cause} | ${error.digest} | ${error.message} | ${error.stack}`,
      }),

      method: "POST",
    })
      .then(() => {
        console.log("report sent");
      })
      .catch((e) => {
        console.warn("failed to send error report", e);
      });

    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
