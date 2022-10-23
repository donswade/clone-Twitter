import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MainContainer from "@components/MainContainer";
const Main = () => {
  return (
    <>
      <Grid container justifyContent="center" spacing={0}>
        <Grid item md={3} s={3} xs={3} height="100vh">
          <Container>Here goes the left sidebar/header </Container>
        </Grid>
        <Grid item md={9} s={9} xs={9} height="100vh">
          <MainContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
