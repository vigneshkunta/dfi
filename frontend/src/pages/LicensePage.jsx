import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LicensePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  if (!id) {
    return <p>Error: License ID is missing.</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/license/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error("Error fetching license:", res.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading license data...</p>
      )}
    </div>
  );
}
