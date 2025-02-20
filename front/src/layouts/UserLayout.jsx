import { getBooks } from "api/get";
import Book from "components/Book";
import { TourLoading } from "components/load/TourLoading";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

export const UserLayout = () => {
  let { id } = useParams();
  id = id ? id : localStorage.getItem("id");
  const { data: books, isLoading } = getBooks();
  const usersBooks = useMemo(
    () => books?.filter((book) => book.userId == id),
    [books, id]
  );

  return isLoading ? (
    [0, 1, 2, 3].map((i) => <TourLoading key={i + "loading"} i={i * 2} />)
  ) : usersBooks?.length ? (
    usersBooks?.map((book) => <Book key={book.id} data={book} />)
  ) : (
    <p>Пусто</p>
  );
};
