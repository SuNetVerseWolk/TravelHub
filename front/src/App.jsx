import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import { TourPage } from "pages/TourPage";
import AdminPage from "pages/AdminPage";
import { Users } from "layouts/Users";
import useRole from "api/useRole";
import { Books } from "layouts/Books";
import { Tours } from "layouts/Tours";
import { BooksPage } from "pages/BooksPage";

const App = () => {
  const { data: role } = useRole();

  return (
    <Routes>
      {role === "admin" ? (
        <Route path="/" element={<AdminPage />}>
          <Route index element={<Tours />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<Books />} />
					<Route path="/tour/:id" element={<TourPage />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
					<Route path="/books" element={<BooksPage />} />
					<Route path="/tour/:id" element={<TourPage />} />
        </>
      )}

    </Routes>
  );
};

export default App;
