import React from "react";
import MyLoadingButton from "../../../../custom-material-styles/LoadingButton";

interface AuthButtonParams {
  isLoading: boolean;
  label: string;
}

const AuthButton: React.FC<AuthButtonParams> = ({ isLoading, label }) => {
  return (
    <MyLoadingButton
      loading={isLoading}
      shouldDisable={isLoading}
      type="submit"
      sx={{ width: "100%", height: "41px", outlineColor: (theme) => theme.palette.divider, color: "#eaebf1" }}
      backgroundcolor="rgba(54, 95, 255, 1)"
    >
      {label}
    </MyLoadingButton>
  );
};

export default AuthButton;
