import Alert from "components/Alert";
import Header from "layouts/Header";
import { Books } from "layouts/Books";
import React from "react";
import styles from "styles/tours.module.css";

export const BooksPage = () => {
  return (
    <>
      <Header />

      <Alert isChildrenText={false}>
        <div
          className={styles.tours}
          style={{ maxWidth: "clamp(320px, 95svw, 1000px)", padding: 'clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 3rem)' }}
        >
          <Books />
        </div>
      </Alert>
    </>
  );
};
