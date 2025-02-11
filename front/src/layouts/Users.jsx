import { getUsers } from "api/get";
import { UserLoading } from "components/load/UserLoading";
import { UserItem } from "components/UserItem";
import React from "react";

export const Users = () => {
  const { data: users, isLoading } = getUsers();

  return isLoading ? (
    [0,1,2].map(i => <UserLoading key={i + 'loading'} />)
  ) : (
    users?.map((user) => <UserItem key={user.id} user={user} />)
  );
};
