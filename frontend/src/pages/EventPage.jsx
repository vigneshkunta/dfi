import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  if (!id) {
    return <p>Error: Event ID is missing.</p>;
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        } else {
          console.error("Error fetching event:", res.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div>
      {event ? (
        <pre>{JSON.stringify(event, null, 2)}</pre>
      ) : (
        <p>Loading event data...</p>
      )}
    </div>
  );
}
