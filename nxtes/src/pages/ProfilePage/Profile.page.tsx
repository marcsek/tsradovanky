import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import FilterTextField from "../../custom-material-styles/FilterTextField";
import MyLoadingButton from "../../custom-material-styles/LoadingButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { updateProfileValidationSchema } from "./schemas";
import { toFormikValidationSchema } from "../../utils/zodToFormik";
import { useFormik } from "formik";
import { useUpdateUser } from "../../queries/queryHooks/User";

const ProfilePage: React.FC = () => {
  const { userID } = useParams();
  const { user } = useUser();
  const { isLoading, mutate: updateUser } = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      name: user?.name,
    },
    validationSchema: toFormikValidationSchema(updateProfileValidationSchema),
    onSubmit: values => {
      updateUser(values);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    updateUser({ profileImg: e.target.files[0] });
  };

  return (
    <Stack sx={{ m: "2rem", gap: "3.25rem" }}>
      <Stack sx={{ alignItems: "flex-start", gap: "0.75rem" }}>
        <Typography variant="h4" sx={{ color: theme => theme.palette.text.primary, fontSize: "2.5rem" }}>
          Your profile
        </Typography>
        <Typography sx={{ color: theme => theme.palette.text.secondary, fontSize: "0.9rem" }}>{`id: ${user?.id}`}</Typography>
      </Stack>
      <Stack
        sx={{
          backgroundColor: theme => theme.palette.background.paper,
          borderRadius: "0.75rem",
          py: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{ gap: "5rem", alignItems: "center", width: "100%", maxWidth: "1000px" }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
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
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={user?.profileImg ? `http://localhost:3001/static/storage/${user?.profileImg}` : "/profilepic.png"}
                alt="profilePicture"
              ></img>
              <Stack
                sx={{
                  position: "absolute",
                  backgroundColor: "transparent",
                  opacity: "0",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  inset: "0",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                  },
                  "&:hover div": {
                    opacity: "0.5",
                    cursor: "pointer",
                  },
                }}
              >
                <AddAPhotoIcon sx={{ color: "white", zIndex: "1" }} />
                <Typography sx={{ zIndex: "1" }}>Change Photo</Typography>
                <Box
                  sx={{
                    zIndex: "0",
                    position: "absolute",
                    backgroundColor: theme => theme.palette.background.paper,
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                  }}
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
          <Box sx={{ display: "flex", width: "100%", gap: "1rem", px: "1rem", boxSizing: "border-box" }}>
            <FilterTextField
              name="name"
              variant="outlined"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && String(formik.errors.name ?? "")}
              error={formik.touched.name && !!formik.errors.name}
              onBlur={formik.handleBlur}
            ></FilterTextField>
            <FilterTextField
              name="email"
              variant="outlined"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email && String(formik.errors.email ?? "")}
              error={formik.touched.email && !!formik.errors.email}
              onBlur={formik.handleBlur}
            ></FilterTextField>
          </Box>
          <MyLoadingButton
            sx={{ width: "50%", height: "41px", outlineColor: theme => theme.palette.divider, color: "#eaebf1" }}
            backgroundcolor="rgba(54, 95, 255, 1)"
            variant="contained"
            type="submit"
            loading={isLoading}
          >
            Save Changes
          </MyLoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
