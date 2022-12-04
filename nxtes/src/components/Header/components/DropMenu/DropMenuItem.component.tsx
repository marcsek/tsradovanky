import { useContext } from "react";
import { Link } from "@mui/material";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import DropContext from "../DropContext";

const DropMenuItem: React.FC<{ title: string; to?: string; onClick?: () => void }> = ({ title, to, onClick }) => {
  const ButtonWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return to ? (
      <Link
        sx={{
          color: theme => theme.palette.text.disabled,
          textAlign: "left",
          display: "block",
          width: "100%",
        }}
        to={to}
        underline="none"
        component={RouterLink}
      >
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  };
  const { setDropOpen } = useContext(DropContext);

  return (
    <Box sx={{ fontSize: "0.85rem" }}>
      <ButtonWrapper>
        <ControlButton
          onClick={() => {
            setDropOpen(false);
            if (onClick) onClick();
          }}
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            py: "4px",
            color: theme => theme.palette.text.disabled,
          }}
        >
          {title}
        </ControlButton>
      </ButtonWrapper>
    </Box>
  );
};

export default DropMenuItem;
