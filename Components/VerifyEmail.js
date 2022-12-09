import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "@mui/material";

const theme = createTheme();

export default function VerifyEmail() {
  const [pressed, setPressed] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification sent!");
      })
      .catch((error) => {
        // An error ocurred
        setError(true);
        // alert('Incorrect Password!');
      });
    setPressed(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VerifiedUserIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Email
          </Typography>

          {pressed ? (
            <Alert severity="success">Sent</Alert>
          ) : (
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Verification Email
            </Button>
          )}

          {error && <Alert severity="error">Already Sent!</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
