import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import { TourPage } from "pages/TourPage";
import AdminPage from "pages/AdminPage";
import ToursLayout from "layouts/ToursLayout";
import { Users } from "layouts/Users";
import Roles from "api/roles";
import useRole from "api/useRole";
import { UserLayout } from "layouts/UserLayout";
import { Tours } from "layouts/Tours";

const App = () => {
  const { data: role } = useRole();

  return (
    <Routes>
      {role === Roles.Admin ? (
        <Route path="/" element={<AdminPage />}>
          <Route index element={<Tours />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserLayout />} />
          <Route path="/tour/:id" element={<TourPage />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourPage />} />
        </>
      )}

      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default App;
