import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: "100%",
  padding: theme.spacing(3),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2)
  }
}));

const SocialButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
  justifyContent: "flex-start",
  paddingLeft: theme.spacing(3),
  "& .icon": {
    marginRight: theme.spacing(2)
  }
}));

const PasswordStrength = styled(LinearProgress)(({ strength }) => ({
  marginTop: 8,
  "& .MuiLinearProgress-bar": {
    backgroundColor:
      strength === "weak" ? "#ff4444" :
      strength === "medium" ? "#ffa000" :
      "#00c853"
  }
}));

const SignUp = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) return "weak";
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/.test(password)) return "strong";
    return "medium";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "username":
        if (value.length < 4) {
          newErrors.username = "Username must be at least 4 characters";
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
          newErrors.username = "Username can only contain letters and numbers";
        } else {
          delete newErrors.username;
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/.test(value)) {
          newErrors.password = "Password must contain at least 8 characters, one uppercase letter, one number, and one special character";
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && termsAccepted) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      alert("Sign up successful!");
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every(value => value.length > 0) &&
      termsAccepted
    );
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4
      }}
    >
      <StyledCard>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create Account
          </Typography>

          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {formData.password && (
                <PasswordStrength
                  variant="determinate"
                  value={validatePassword(formData.password) === "weak" ? 33 : validatePassword(formData.password) === "medium" ? 66 : 100}
                  strength={validatePassword(formData.password)}
                />
              )}
            </Stack>

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid() || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>

            <Typography align="center" color="textSecondary">
              Already have an account?{" "}
              <Button color="primary" onClick={() => console.log("Navigate to login")}>
                Login
              </Button>
            </Typography>
          </Stack>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default SignUp;