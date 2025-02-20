import Alert from "components/Alert";
import Header from "layouts/Header";
import { UserLayout } from "layouts/UserLayout";
import React from "react";
import styles from "styles/tours.module.css";

export const BooksPage = () => {
  return (
    <>
      <Header />

      <Alert isChildrenText={false}>
        <div
          className={styles.tours}
          style={{ maxWidth: "clamp(320px, 95svw, 1000px)", padding: '2rem 3rem' }}
        >
          <UserLayout />
        </div>
      </Alert>
    </>
  );
};
