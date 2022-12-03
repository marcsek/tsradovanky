import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { userID } = useParams();
  return <div>{userID}</div>;
};

export default ProfilePage;
