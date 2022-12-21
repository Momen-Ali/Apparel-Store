import React from "react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
const Footer = () => {
  return (
    <Box mt="70px" p="40px" backgroundColor="#edececd4">
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Casual
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            minus delectus, architecto quia voluptatum odit distinctio in
            dolorem veritatis quisquam fugiat amet perspiciatis deleniti,
            repellendus assumenda autem? Voluptatem, sapiente ea.
          </div>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">3247 Palm Ave, Sacramento</Typography>
          <Typography mb="30px">Email:Casual@info.com</Typography>
          <Typography mb="30px">(888)177-3633</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
