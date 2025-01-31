import { getUsers } from "api/get";
import { UserItem } from "components/UserItem";
import React from "react";

export const Users = () => {
  const { data: users, refetch } = getUsers();

  return (
		users?.map((user) => (
			<UserItem key={user.id} user={user} />
		))
  );
};
