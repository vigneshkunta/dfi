import React from "react";

const Profile = () => {
  const dummyUser = {
    registrationDate: "June 15, 2025 11:35 am",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "+91 9876543210",
    occupation: "Software Developer",
    biography: "Passionate developer and lifelong learner.",
  };

  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Profile
        </h2>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm sm:text-base text-left">
            <tbody className="divide-y divide-gray-100">
              <TableRow
                label="Registration Date"
                value={dummyUser.registrationDate}
              />
              <TableRow label="First Name" value={dummyUser.firstName} />
              <TableRow label="Last Name" value={dummyUser.lastName} />
              <TableRow label="Username" value={dummyUser.username} />
              <TableRow label="Email" value={dummyUser.email} />
              <TableRow label="Phone Number" value={dummyUser.phone} />
              <TableRow label="Skill/Occupation" value={dummyUser.occupation} />
              <TableRow label="Biography" value={dummyUser.biography} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b last:border-none">
    <td className="px-4 py-4 bg-gray-50 font-medium text-gray-600 w-1/3">
      {label}
    </td>
    <td className="px-4 py-4 text-gray-700">{value || "-"}</td>
  </tr>
);

export default Profile;
