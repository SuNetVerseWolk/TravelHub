import { Route, Routes } from 'react-router-dom'
import { useState, useMemo } from 'react'

function App() {
  const [userInfo, setUserInfo] = useState(localStorage.getItem('info') && JSON.parse(localStorage.getItem('info')));
	const main = useMemo(e =>
		userInfo?.id === import.meta.env.VITE_ADMIN_ID ? (
			// <Admin setUserInfo={setUserInfo} />
			<>Admin</>
		) : userInfo ? (
			// <Materials userInfo={userInfo} setUserInfo={setUserInfo} />
			<>Materials idk w's it</>
		) : (
			// <Login setUserInfo={setUserInfo} />
			<>Login</>
		), [userInfo]);

  return (
    <Routes>
			<Route path='' element={main} >
				<Route path=':id' element={<></>} >
					<Route path=':teacherID' element={<></>} />
				</Route>
			</Route>
			<Route path='/singUp' element={<>Sing up page</>}></Route>
    </Routes>
  )
}

export default App
