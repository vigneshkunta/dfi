import React from "react";

const Wishlist = () => {
  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">Wishlist</h2>

        {/* No Data State */}
        <div className="text-center flex flex-col items-center justify-center">
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
  );
};

export default Wishlist;
