import "./LoginPage.css"
import Login from "../../components/Login/Login"

const LoginPage = ({ setIsAuth }) => {
  return (
    <div className="login-page">
      <Login setIsAuth={setIsAuth}/>
    </div>
  )
}

export default LoginPage;