import React, { useEffect, useState } from "react";
import axios from "axios";

type TUser = {
  id: number;
  name: string;
};
export const UserList: React.FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  if (error) {
    return <div role="alert">{error}</div>;
  }

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
