import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import { TourPage } from 'pages/TourPage'
import AdminPage from 'pages/AdminPage'

const App = () => {
  return (
    <Routes>
			<Route path='/' element={<Home />} />
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
