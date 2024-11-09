import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/ui";
import { Card } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { LoadingContext } from "../../context/LoadingContext";
import { registerUser } from "../../utils/api";
function Register() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUser, setErrorsAuth, errorsAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const baseURL = import.meta.env.VITE_BACKEND || "http://localhost:3000/api";

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await registerUser(data);
      await setUser(res);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrorsAuth(error.response.data);
      }
      setErrorsAuth([error.response.data.message]);
    }
  });

  return (
    <div className="login-container">
      <Card>
        {errorsAuth && (
          <div className="error-message">
            {errorsAuth.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <h3 className="login-title">Registrarse</h3>
        <form onSubmit={onSubmit} className="space-y-4 w-[30vw]">
          <Input
            className="input-login"
            label="Nombre Completo"
            type="text"
            placeholder="Nombre Completo"
            {...register("nombre", { required: true })}
          />
          {errors.fullName && (
            <span className="error-text">Este campo es requerido</span>
          )}
          <Input
            className="input-login"
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="error-text">Este campo es requerido</span>
          )}
          <Input
            className="input-login"
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            {...register("contrasena", { required: true })}
          />
          {errors.password && (
            <span className="error-text">Este campo es requerido</span>
          )}
          <Input
            className="input-login"
            label="Confirmar Contraseña"
            type="password"
            placeholder="Confirmar Contraseña"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className="error-text">Este campo es requerido</span>
          )}
          <div>
            <Button className="button-login">Registrarse</Button>
          </div>
        </form>
        <div>
          <p className="register-text">
            ¿Ya tienes cuenta?{" "}
            <Link className="text-[#56b280] hover:text-[#128546]" to={"/login"}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Register;
