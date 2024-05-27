"use client";
import useAuth from "@/lib/hooks/useAuth";
import { useState } from "react";

interface InviteInfoData {
  email: string;
  role: string;
}

export default function InviteUsers() {
  const { token } = useAuth();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteInfoList, setInviteInfoList] = useState<InviteInfoData[]>([
    { email: "", role: "" },
  ]);
  const [showInviteStatus, setShowInviteStatus] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const handleAddInvite = () => {
    setInviteInfoList([...inviteInfoList, { email: "", role: "" }]);
  };

  const handleRemoveInvite = (index: number) => {
    const updatedInvites = [...inviteInfoList];
    updatedInvites.splice(index, 1);
    setInviteInfoList(updatedInvites);
  };

  const handleInputChange = (
    index: number,
    field: keyof InviteInfoData,
    value: string
  ) => {
    const updatedInvites = [...inviteInfoList];
    updatedInvites[index][field] = value;
    setInviteInfoList(updatedInvites);
    setResponse("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${api}/admins/invite_users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inviteInfoList),
      });

      const res = await response.json();

      if (response.ok) {
        setInviteInfoList([{ email: "", role: "" }]);
        setShowInviteStatus(true);
        setResponse(res);
        console.log(res);
      } else {
        setInviteInfoList([{ email: "", role: "" }]);
        setShowInviteStatus(false);
        setResponse(res);
        console.error("Error inviting users:", res);
      }
    } catch (error) {
      console.error("Error inviting users:", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Invite Users</h1>
      <form onSubmit={handleSubmit}>
        {inviteInfoList.map((inviteInfo, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="w-full">
              <div className="mb-2">
                <label
                  htmlFor={`email-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id={`email-${index}`}
                  name="email"
                  value={inviteInfo.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[18px] text-black"
                />
              </div>
              <div>
                <label
                  htmlFor={`role-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  style={{ color: "black", fontSize: "18px" }}
                  id={`role-${index}`}
                  name="role"
                  value={inviteInfo.role}
                  onChange={(e) =>
                    handleInputChange(index, "role", e.target.value)
                  }
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveInvite(index)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddInvite}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Add Invite
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Inviting..." : "Submit Invites"}
          </button>
        </div>
        {response && (response as string).length > 0 && (
          <div className="mt-4 bg-blue-100 text-blue-800 rounded-lg inline-block px-4 py-2">
            {response}
          </div>
        )}
      </form>
    </div>
  );
}
