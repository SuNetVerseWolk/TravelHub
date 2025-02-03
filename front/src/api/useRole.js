import { useQuery } from "@tanstack/react-query";
import { Roles } from "./enums";

const useRole = () => {
	return useQuery({
			queryKey: ['role'],
			queryFn: () => {
					const userId = localStorage.getItem('id');
					switch (userId) {
							case import.meta.env.VITE_ADMIN_ID:
									return Roles.Admin;
							case null:
									return Roles.Guest;
							default:
									return Roles.User;
					}
			},
	});
};

export default useRole;