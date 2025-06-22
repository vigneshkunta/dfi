import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  if (!id) {
    return <p>Error: Course ID is missing.</p>;
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        } else {
          console.error('Error fetching course:', res.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div>
      {course ? (
        <pre>{JSON.stringify(course, null, 2)}</pre>
      ) : (
        <p>Loading course data...</p>
      )}
    </div>
  );
}
