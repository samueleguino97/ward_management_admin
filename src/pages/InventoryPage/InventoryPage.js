import React from "react";
import Inventory from "../../features/Inventory/Inventory";
import Movements from "../../features/movements/Movements";
import { Box, Container } from "@material-ui/core";

function InventoryPage() {
  return (
    <Container
      maxWidth="md"
      style={{ padding: 12, display: "flex", height: "100%" }}
    >
      <Box width={300} marginRight={2}>
        <Inventory />
      </Box>
      <Box flex={1}>
        <Movements />
      </Box>
    </Container>
  );
}

export default InventoryPage;
