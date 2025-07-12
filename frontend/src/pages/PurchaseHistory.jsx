import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const filterByRange = (history, start, end) =>
  history.filter((item) => {
    const date = new Date(item.paidAt);
    return (!start || date >= start) && (!end || date <= end);
  });

const PurchaseHistory = () => {
  const history =
    useSelector((s) => s.user.currentUser?.data?.paymentHistory) || [];

  const [selectedFilterType, setSelectedFilterType] = useState("Today");
  const [customRangeStart, setCustomRangeStart] = useState("");
  const [customRangeEnd, setCustomRangeEnd] = useState("");
  const [triggerCustomFilter, setTriggerCustomFilter] = useState(0);

  const filteredHistory = useMemo(() => {
    const now = new Date();
    let startDate = null;
    let endDate = null;

    if (selectedFilterType === "Today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );
    } else if (selectedFilterType === "Monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = now;
    } else if (selectedFilterType === "Yearly") {
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = now;
    } else {
      startDate = customRangeStart ? new Date(customRangeStart) : null;
      endDate = customRangeEnd ? new Date(customRangeEnd) : null;
    }

    return filterByRange(history, startDate, endDate);
  }, [history, selectedFilterType, customRangeStart, customRangeEnd, triggerCustomFilter]);

  const handlePredefinedFilterClick = (type) => {
    setSelectedFilterType(type);
    setCustomRangeStart("");
    setCustomRangeEnd("");
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setCustomRangeStart(value);
    } else {
      setCustomRangeEnd(value);
    }
    setSelectedFilterType("");
  };

  const handleApplyCustomRangeClick = () => {
    setTriggerCustomFilter((prev) => prev + 1);
  };

  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Purchase History</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex gap-2">
            {["Today", "Monthly", "Yearly"].map((label) => (
              <button
                key={label}
                onClick={() => handlePredefinedFilterClick(label)}
                className={`px-4 py-2 border rounded ${
                  selectedFilterType === label
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-100"
                } transition`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="date"
              name="start"
              value={customRangeStart}
              onChange={handleCustomDateChange}
              className="border px-3 py-2 rounded"
            />
            <span>to</span>
            <input
              type="date"
              name="end"
              value={customRangeEnd}
              onChange={handleCustomDateChange}
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={handleApplyCustomRangeClick}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No data"
              className="mx-auto opacity-60 w-48"
            />
            <p className="text-gray-500 mt-4">No Data Available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="capitalize font-semibold text-blue-700">
                    {item.type}
                  </div>
                  <div className="text-sm text-gray-600">
                    Receipt: <code>{item.receiptId}</code>
                  </div>
                  <div className="text-sm text-gray-600">
                    Paid At: {formatDate(item.paidAt)}
                  </div>
                  {item.validUntil && (
                    <div className="text-sm text-gray-600">
                      Valid Until: {formatDate(item.validUntil)}
                    </div>
                  )}
                </div>
                <div className="text-green-600 font-bold text-lg">
                  ₹{item.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;