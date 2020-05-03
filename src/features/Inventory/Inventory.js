import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
  IconButton,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import classes from "./Inventory.module.scss";

function Inventory() {
  return (
    <Card>
      <CardHeader
        title="Inventario"
        action={
          <IconButton style={{ marginTop: 8 }}>
            <Add />
          </IconButton>
        }
      />
      <CardContent>
        <List>
          <Card className={classes.card}>
            <ListItem>
              <ListItemText>Item</ListItemText>
              <ListItemText>Item</ListItemText>
              <ListItemText>Item</ListItemText>
              <ListItemText>Item</ListItemText>
              <ListItemSecondaryAction>Sa</ListItemSecondaryAction>
            </ListItem>
          </Card>
        </List>
      </CardContent>
    </Card>
  );
}

export default Inventory;
