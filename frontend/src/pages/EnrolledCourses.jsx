import React, { useState } from "react";

const EnrolledCourses = () => {
  const [activeTab, setActiveTab] = useState("enrolled");

  const tabs = [
    { id: "enrolled", label: "Enrolled Courses" },
    { id: "active", label: "Active Courses" },
    { id: "completed", label: "Completed Courses" },
  ];

  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow">
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-800">Enrolled Courses</h2>
        </div>

        <div className="px-6 pt-4">
          <div className="flex space-x-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm sm:text-base font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-[#3f51f7] border-b-2 border-[#3f51f7]"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* No Data State */}
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <div className="w-40 sm:w-52">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="no data"
                className="opacity-70 mx-auto"
              />
            </div>
            <p className="text-gray-500 text-sm mt-6">
              No Data Available in this Section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
