import React from "react";
import Inventory from "../../features/Inventory/Inventory";
import Movements from "../../features/movements/Movements";
import { Box, Container } from "@material-ui/core";

function InventoryPage() {
  return (
    <Container
      maxWidth={false}
      style={{ padding: 12, display: "flex", height: "100%" }}
    >
      <Box flex={1}>
        <Inventory />
      </Box>
      <Box width={400} marginLeft={2}>
        <Movements />
      </Box>
    </Container>
  );
}

export default InventoryPage;
