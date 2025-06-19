import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { updateUserDetails } from "../redux/user/userSlice";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const user = currentUser?.data;
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    occupation: user?.occupation || "",
    bio: user?.bio || "",
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = (field) => {
    setEditState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateUserDetails(formValues)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  const registrationDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleString("en-IN", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "-";

  return (
    <div className="bg-[#f4f6fe] min-h-screen px-4 py-10 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Profile
        </h2>

        <div className="border rounded-xl overflow-hidden mb-6">
          <table className="w-full text-sm sm:text-base text-left">
            <tbody className="divide-y divide-gray-100">
              <TableRow label="Registration Date" value={registrationDate} />

              {Object.entries(formValues).map(([key, value]) => (
                <TableRow
                  key={key}
                  label={formatLabel(key)}
                  value={value}
                  editable
                  isEditing={!!editState[key]}
                  onEdit={() => handleToggleEdit(key)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const TableRow = ({ label, value, editable = false, isEditing, onEdit, onChange }) => {
  return (
    <tr className="group border-b last:border-none">
      <td className="px-4 py-4 bg-gray-50 font-medium text-gray-600 w-1/3">
        {label}
      </td>
      <td className="px-4 py-4 text-gray-700 flex items-center justify-between gap-3">
        {editable && isEditing ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <span className="flex-1">{value || "-"}</span>
        )}

        {editable && (
          <button
            onClick={onEdit}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-indigo-500 hover:scale-110 hover:text-indigo-700 transition-transform duration-150" />
          </button>
        )}
      </td>
    </tr>
  );
};

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

export default Profile;
