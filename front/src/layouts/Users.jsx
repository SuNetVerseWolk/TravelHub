import { getUsers } from "api/get";
import { UserItem } from "components/UserItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import adminStyles from "styles/adminPage.module.css";

export const Users = () => {
  const { data: users, refetch } = getUsers();

  return (
		users?.map((user) => (
			<UserItem key={user.id} user={user} />
		))
  );
};
