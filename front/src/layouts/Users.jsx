import { getBooks, getUsers } from "api/get";
import Alert from "components/Alert";
import { UserLoading } from "components/load/UserLoading";
import { UserItem } from "components/UserItem";
import React, { useMemo } from "react";

export const Users = () => {
  const { data: users, isLoading } = getUsers();
  const { data: books } = getBooks();
  const bookedUserIds = useMemo(
    () => [...new Set(books?.map((book) => book.userId))],
    [books]
  );
  const usersWhoBookedTours = useMemo(
    () => users?.filter((user) => bookedUserIds?.includes(user.id)),
    [users, bookedUserIds]
  );

  return isLoading ? (
    [0, 1, 2].map((i) => <UserLoading key={i + "loading"} />)
  ) : usersWhoBookedTours?.length > 0 ? (
    usersWhoBookedTours?.map((user) => <UserItem key={user.id} user={user} />)
  ) : (
    <Alert>Броней нет</Alert>
  );
};
