import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import appLogo from "../../assets/app-logo.svg";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="#">
        akka - Job Finder
      </Link>{" "}
      {". "}
      {"All rights reserved."}
    </Typography>
  );
}

export default function Footer() {
  const sections = [
    {
      title: "Company",
      items: [
        { title: "About Us", to: "#" },
        { title: "Credits", to: "#" },
      ],
    },
    {
      title: "For Talents",
      items: [
        { title: "Create Account", to: "#" },
        { title: "Login", to: "#" },
        { title: "Find Jobs", to: "#" },
      ],
    },
    {
      title: "For Recruiters",
      items: [
        { title: "Create Account", to: "#" },
        { title: "Login", to: "#" },
        { title: "Find Talents", to: "#" },
        { title: "Pricing", to: "/pricing" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={4} md={6}>
            <Stack direction="row" alignItems="center">
              <img src={appLogo} height={40} />
              <Typography variant="body1" fontWeight="bold">
                Job Finder
              </Typography>
            </Stack>
            <Copyright />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Grid container spacing={2}>
              {sections.map((section) => (
                <Grid item xs={6} sm={4} key={"footer-item-" + section.title}>
                  <Stack>
                    <Typography fontWeight="bold">{section.title}</Typography>
                    {section.items.map((item) => (
                      <Typography key={item.title}>{item.title}</Typography>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
