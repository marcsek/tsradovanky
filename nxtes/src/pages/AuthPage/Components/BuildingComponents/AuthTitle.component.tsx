import React from "react";
import { Box, Typography } from "@mui/material";

interface AuthTitleParams {
  headingComp: React.ReactNode;
  subHeadComp: React.ReactNode;
}

const AuthTitle: React.FC<AuthTitleParams> = ({ headingComp, subHeadComp }) => {
  return (
    <Box sx={{ textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography sx={{ color: (theme) => theme.palette.text.primary, fontSize: "1.7rem", mb: "10px" }} variant="h5">
          {headingComp}
        </Typography>
        <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>{subHeadComp}</Typography>
      </Box>
      <Box
        sx={{
          height: "50px",
          minWidth: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: "50%",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <img style={{ height: "30px", width: "100%", display: "block" }} alt="chain" src="/chains.svg"></img>
      </Box>
    </Box>
  );
};

export default AuthTitle;
