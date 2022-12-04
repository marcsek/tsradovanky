import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import FilterTextField from "../../custom-material-styles/FilterTextField";
import MyLoadingButton from "../../custom-material-styles/LoadingButton";
import { updateProfileValidationSchema } from "./schemas";
import { toFormikValidationSchema } from "../../utils/zodToFormik";
import { useFormik } from "formik";
import { useUpdateUser } from "../../queries/queryHooks/User";
import { ProfilePictureInput } from "./Components/ProfilePictureInput.component";

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

  //TODO: Abstract some things into components
  return (
    <Stack sx={{ p: "2rem", gap: "3.25rem", maxWidth: "1680px", width: "100%", alignSelf: "center", boxSizing: "border-box" }}>
      <Stack sx={{ alignItems: "flex-start", gap: "0.75rem" }}>
        <Typography variant="h4" sx={{ color: theme => theme.palette.text.primary, fontSize: "2.5rem" }}>
          Your profile
        </Typography>
        <Typography sx={{ color: theme => theme.palette.text.secondary, fontSize: "0.9rem" }}>{`id: ${user?.id}`}</Typography>
      </Stack>
      <Stack
        sx={{
          backgroundColor: theme => theme.palette.background.paper,
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 50px -10px",
          borderRadius: "0.75rem",
          py: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack sx={{ gap: "4rem", alignItems: "center", width: "100%", maxWidth: "650px" }} component="form" onSubmit={formik.handleSubmit}>
          <ProfilePictureInput />
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
