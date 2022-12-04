import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useUser } from "../../../context/userContext";
import { useUpdateUser } from "../../../queries/queryHooks/User";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const allowedExtensions = ["jpg", "png", "jpeg", "gif"];

export const ProfilePictureInput: React.FC = () => {
  const { user } = useUser();
  const { isLoading, mutate: updateUser } = useUpdateUser();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.length);
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").at(-1);

    if (!allowedExtensions.includes(fileExtension ?? "")) {
      toast.error("Your file had unsupported file extension");
      return;
    }
    // else if (file.size > 1000 * 1000 * 2.5) {
    //   toast.error("Your file exceeded max. file size (2.5 MB)");
    //   return;
    // }

    updateUser({ profileImg: e.target.files[0] });
  };

  return (
    <Stack>
      <Box
        sx={{
          width: "140px",
          height: "140px",
          p: "0.5rem",
          borderRadius: "50%",
          outline: theme => `2px dashed ${theme.palette.text.secondary}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", pointerEvents: "none" }}
          src={user?.profileImg ? `http://localhost:3001/static/storage/${user?.profileImg}` : "/profilepic.png"}
          alt="profilePicture"
        ></img>
        <Stack
          sx={{
            position: "absolute",
            backgroundColor: theme => theme.palette.background.paper + "AA",
            opacity: isLoading ? "1" : "0",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            inset: "0",
            zIndex: "1",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              opacity: "1",
              //   pointerEvents: "none",
              cursor: "pointer",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size="23px" sx={{ color: theme => theme.palette.text.disabled }} />
          ) : (
            <>
              <AddAPhotoIcon sx={{ color: "white" }} />
              <Typography>Change Photo</Typography>
            </>
          )}

          <Box
            sx={{
              zIndex: "0",
              position: "absolute",
              backgroundColor: theme => theme.palette.background.paper,
              width: "100%",
              height: "100%",
              inset: "0",
              opacity: "0",
              cursor: "pointer",
            }}
            accept=".png,.jpg,.jpeg,.gif"
            component="input"
            type="file"
            onChange={handleFileSelect}
          />
        </Stack>
      </Box>
      <Typography sx={{ color: theme => theme.palette.text.secondary, fontSize: "0.8rem", mt: "1.5rem" }}>
        Only *.jpeg, *.jpg, *.gif, *.png
        <br /> with max file size 2.5 MB
      </Typography>
    </Stack>
  );
};
