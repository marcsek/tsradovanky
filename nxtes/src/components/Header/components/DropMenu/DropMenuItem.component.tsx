import { Link } from "@mui/material";
import ControlButton from "../../../../custom-material-styles/ControlButton";
import { Link as RouterLink } from "react-router-dom";

const DropMenuItem: React.FC<{ title: string; to?: string; onClick?: () => void }> = ({ title, to, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        py: "4px",
        fontSize: "0.85rem",
        color: theme => theme.palette.text.disabled,
      }}
    >
      {to ? (
        <Link sx={{ color: theme => theme.palette.text.disabled }} to={to} underline="none" component={RouterLink}>
          {title}
        </Link>
      ) : (
        <>{title}</>
      )}
    </ControlButton>
  );
};

export default DropMenuItem;
