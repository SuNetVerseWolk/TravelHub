import React from "react";
import { useLocation } from "react-router-dom";

export const UserLayout = () => {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div>
      {user ? (
        <div>
          <h1>User Details</h1>
					{Object.keys(user).map((key, i) => typeof user[key] != 'object' && <p key={i}>{key}: {user[key]}</p>)}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};
