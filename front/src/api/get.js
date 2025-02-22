import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getApi = ({ key, path, onSuccess, enabled = true }) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const res = await axios.get("/api/" + path);
        const data = res.data;

        if (onSuccess) {
          onSuccess(data);
        }

        return data;
      } catch (error) {
        throw new Error(
          `API Error: ${error.response?.data?.message || error.message}`
        );
      }
    },
    enabled,
    refetchOnWindowFocus: false,
  });
};

export const getUsers = () =>
  getApi({
    key: ["users"],
    path: "users",
  });
export const getBooks = () =>
	getApi({
		key: ["books"],
		path: "books",
	});

export const getUser = (id) => {
  const userId = id || localStorage.getItem("id");

  return getApi({
		key: ["user", userId],
    path: `users/${userId}`,
  });
};
export const getTour = (id, enabled = true) => getApi({
	key: ["tour", id],
	path: `tours/${id}`,
	enabled: enabled
});

export const getDateFrom2day = (number = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + number);

  return date.toISOString().slice(0, 10);
};
export const getDateDiff = (date) => {
	const [come, out] = date?.split(" - ") || [];
	const days = Math.round((new Date(out) - new Date(come)) / (1000 * 60 * 60 * 24));

	return days;
}

export const getFormData = (ref) =>
  Object.fromEntries(new FormData(ref?.current)?.entries());

export default getApi;
