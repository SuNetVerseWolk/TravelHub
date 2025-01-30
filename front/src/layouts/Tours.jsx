import getApi from "api/get";
import Alert from "components/Alert";
import Tour from "components/Tour";
import React from "react";

export const Tours = () => {
  const {
    data: tours,
    isLoading,
    isError,
  } = getApi({
    key: ["tours"],
    path: "tours",
  });

  return isLoading ? (
    <Alert>Загрузка...</Alert>
  ) : isError ? (
    <Alert>Что-то пошло не так</Alert>
  ) : tours?.length <= 0 ? (
    <Alert>К сожалению туров нет</Alert>
  ) : (
    tours?.map((tour) => <Tour key={tour.id} data={tour} />)
  );
};
