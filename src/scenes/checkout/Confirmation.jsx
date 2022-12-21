import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made your Order —{" "}
        <strong>Congrats on your new order</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
