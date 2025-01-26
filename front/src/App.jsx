import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import { TourPage } from "pages/TourPage";
import AdminPage from "pages/AdminPage";
import ToursLayout from "layouts/ToursLayout";
import styles from "styles/adminPage.module.css";
import { Users } from "layouts/Users";
import Roles from "api/roles";
import useRole from "api/useRole";

const App = () => {
  const { data: role } = useRole();

  return (
    <Routes>
      {role === Roles.Admin ? (
        <Route path="/" element={<AdminPage />}>
          <Route
            index
            element={
              <ToursLayout
                showAdminPanel={true}
                extraStyles={styles.toursLayout}
              />
            }
          />
          <Route
            path="/users"
            element={<Users extraStyles={styles.toursLayout} />}
          />
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
