import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/ui";
import { Card } from "antd";
import api, { login } from "../../utils/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";
const Login = () => {
  const navigate = useNavigate();
  const { setUser, setErrorsAuth, errorsAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log("paso");
    console.log(data);
    try {
      const response = await login(data);
      console.log(response);
      /*   await setUser(response.data.user);
      console.log(response.data);
      setTimeout(() => {
        navigate("/profile");
      }, 1000); */
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrorsAuth(error.response.data);
      }
      console.log(typeof error);
      setErrorsAuth([error.response.data.message]);
    }
  });
  return (
    <div className="login-container">
      <Card className="card-transparent">
        {JSON.stringify(errorsAuth) !== "null" && (
          <div className="login-title">
            {errorsAuth.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <h3 className="login-title">Iniciar Sesión</h3>
        <form onSubmit={onSubmit} className="space-y-4 w-[30vw]">
          <Input
            className="input-login"
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="error-text">Este campo es obligatorio</span>
          )}
          <Input
            className="input-login"
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="error-text">Este campo es obligatorio</span>
          )}
          <div>
            <Button className="button-login">Iniciar Sesión</Button>
          </div>
        </form>
        <div>
          <p className="register-text">
            ¿No tienes cuenta?{" "}
            <Link
              className="text-[#56b280] hover:text-[#128546]"
              to={"/register"}
            >
              Registrarse
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
