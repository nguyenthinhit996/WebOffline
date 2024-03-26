"use client";
import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
        Oops! We couldn't find the page you're looking for.
      </Typography>
      <Typography variant="body1">
        It seems like the page you're trying to access has either been moved or
        doesn't exist. Don't worry, we can help you get back on track.
      </Typography>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={() => router.push("/about")}
        >
          Contact Us
        </Button>
      </Box>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Link href="/" underline="none">
          &#169; 2024 Your Company Name
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
