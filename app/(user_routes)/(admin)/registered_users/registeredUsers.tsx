import { RegisteredUser } from "@/types/RegisteredUsers";

export const RegisteredUsersList = ({
  registeredUsers,
}: {
  registeredUsers: RegisteredUser[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {registeredUsers.map((user: RegisteredUser) => (
        <div key={user.user_id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {user.name}
          </h3>
          <div className="text-sm text-gray-600 mb-2">Email: {user.email}</div>
          <div className="text-sm text-gray-600 mb-2">
            Phone: {user.phone_no}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Address: {user.address}
          </div>
          <div className="text-sm text-gray-600 mb-2">Role: {user.role}</div>
        </div>
      ))}
    </div>
  );
};
