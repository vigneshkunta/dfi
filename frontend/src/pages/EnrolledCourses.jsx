import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const courses = useSelector((state) => state.courses?.courses?.data || []);
  const currentUser = useSelector((state) => state.user?.currentUser?.data);

  useEffect(() => {
    if (!currentUser) return;

    const enrolledCourseIds = (currentUser.enrolledCourses || []).map(
      (item) => item.course
    );

    const matchedCourses = courses.filter((course) =>
      enrolledCourseIds.includes(course._id)
    );

    setEnrolledCourses(matchedCourses);
  }, [courses, currentUser]);

  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow">
        {/* Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-800">Enrolled Courses</h2>
        </div>

        {/* Course List */}
        <div className="px-6 py-8">
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center">
              <div className="w-40 sm:w-52">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                  alt="No courses"
                  className="opacity-70 mx-auto"
                />
              </div>
              <p className="text-gray-500 text-sm mt-6">
                No Enrolled Courses Found
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Showing {enrolledCourses.length} course
                {enrolledCourses.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="border rounded-xl p-4 shadow-sm bg-white transition hover:shadow-md"
                  >
                    <img
                      src={
                        course.image ||
                        "https://via.placeholder.com/300x200?text=Course+Image"
                      }
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {course.category}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {course.about}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
