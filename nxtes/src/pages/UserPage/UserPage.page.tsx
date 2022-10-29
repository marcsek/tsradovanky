import React, { useEffect } from "react";
import { useLogin, useGetMe } from "../../queries";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { refetch, isSuccess: isLoginSuccess, error } = useLogin("d", "d");
  const { data, status } = useGetMe();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    refetch();
  };

  useEffect(() => {
    if (status === "success" && data) {
      console.log(data);
      setUser({ name: data.name, email: data.email, id: data.id });
    } else if (status === "error") {
      //   console.log(error);
    }
  }, [status]);

  return (
    <div>
      <button onClick={handleButtonClick}>Login</button>
    </div>
  );
};

export default UserPage;
