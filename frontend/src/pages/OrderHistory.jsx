import React from "react";

const OrderHistory = () => {
  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Order History</h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
          <div className="flex gap-4">
            {["Today", "Monthly", "Yearly"].map((label) => (
              <button
                key={label}
                className="border border-[#1b4eff] text-[#1b4eff] font-medium px-4 py-2 rounded-md hover:bg-[#eaf0ff] transition"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Date Range Picker Look */}
          <div>
            <input
              type="text"
              placeholder="Y-M-d -- Y-M-d"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
        </div>

        {/* No Data State */}
        <div className="text-center flex flex-col items-center justify-center">
          <div className="w-40 sm:w-52">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No data"
              className="opacity-70 mx-auto"
            />
          </div>
          <p className="text-gray-500 text-sm mt-6">
            No Data Available in this Section
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
