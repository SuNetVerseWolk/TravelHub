import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Rooms from 'layouts/Rooms'
import Users from 'pages/Users'

const App = () => {
  return (
    <Routes>
			<Route path='/' element={<Home />}>
        <Route path='/:type' element={null}/>
      </Route>

			<Route
        path='/logIn'
        element={<LogIn />}
      />

			<Route
        path='/signUp'
        element={<SignUp />}
      />
      <Route path='/users/' element={<Users />}>
        <Route path='/users/:type'/>
      </Route>
    </Routes>
  )
}

export default App
