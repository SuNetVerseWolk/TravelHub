import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import { TourPage } from 'pages/TourPage'
import AdminPage from 'pages/AdminPage'
import { useMemo } from 'react'
import ToursLayout from 'layouts/ToursLayout'
import styles from 'styles/adminPage.module.css'
import { Users } from 'layouts/Users'

const App = () => {
  const userId = useMemo(() => localStorage.getItem('id'), [localStorage]);

  return (
    <Routes>
			{userId === import.meta.env.VITE_ADMIN_ID ? (
        <Route path='/' element={<AdminPage />} >
          <Route index element={<ToursLayout showAdminPanel={true} extraStyles={styles.toursLayout} />} />
          <Route path='/users' element={<Users extraStyles={styles.toursLayout} />} />
          <Route path='/tour/:id' element={<TourPage />} />
        </Route>
      ) : (
        <Route path='/' element={<Home />} />
      )}
      <Route path='/tour/:id' element={<TourPage />} />

			<Route
        path='/logIn'
        element={<LogIn />}
      />

			<Route
        path='/signUp'
        element={<SignUp />}
      />
    </Routes>
  )
}

export default App
