import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import "./styles.css";

const Loading = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) {
    return null; // No renderiza nada si loading es false
  }

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
