import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography, Box, Avatar, CircularProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const PostCreateBox = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) {
      setError("Please add text or an image.");
      return;
    }

    setLoading(true);
    setError("");  // Clear any previous error

    // Simulate a post submission (replace with actual API call)
    setTimeout(() => {
      console.log("Post Data:", { text, image });
      setText("");
      setImage(null);
      setLoading(false);
      alert("Post created successfully!");
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          margin: "auto",
          marginTop: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          {/* Author Section */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Avatar sx={{ marginRight: 2 }} src="https://randomuser.me/api/portraits/men/32.jpg" />
            <Typography variant="h6">John Doe</Typography>
          </Box>

          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Share your thoughts...
          </Typography>

          {/* Image Preview */}
          {image && (
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
          )}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: 16, display: "block", margin: "auto" }}
          />

          {/* Text Input */}
          <TextField
            fullWidth
            label="Write something..."
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            multiline
            rows={4}
            sx={{
              marginTop: 2,
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="secondary" /> : "Post"}
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default PostCreateBox;
