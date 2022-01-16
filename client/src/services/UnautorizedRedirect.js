import { useNavigate } from "react-router-dom";

const UnauthorizedRedirect = () => {
  const navigate = useNavigate();
  navigate("/login");
};

export default UnauthorizedRedirect;
