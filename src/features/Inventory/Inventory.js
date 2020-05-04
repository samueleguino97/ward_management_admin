import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
  IconButton,
  Dialog,
} from "@material-ui/core";
import { Add, EditRounded, Delete } from "@material-ui/icons";

import classes from "./Inventory.module.scss";
import { useItems } from "../../hooks/db";
import FormDialog from "../FormDialog/FormDialog";

function Inventory() {
  const [items, { createItem, deleteItem }] = useItems();
  const [open, setOpen] = useState(false);
  return (
    <Card className={classes.container}>
      <FormDialog
        fields={require("./formFields.json")}
        initialState={{ name: "", unit: "" }}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(values) => {
          createItem({ ...values, quantity: 0 });
        }}
      />
      <CardHeader
        title="Inventario"
        action={
          <IconButton onClick={() => setOpen(true)} style={{ marginTop: 8 }}>
            <Add />
          </IconButton>
        }
      />
      <CardContent>
        <List>
          {items?.map((item) => (
            <Card className={classes.card}>
              <ListItem className={classes.item}>
                <ListItemText>{item.name}</ListItemText>
                <ListItemText>
                  {item.quantity} {item.unit}
                </ListItemText>
                <ListItemText className={classes.actions}>
                  <IconButton onClick={() => deleteItem(item._id)}>
                    <Delete />
                  </IconButton>
                </ListItemText>
              </ListItem>
            </Card>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default Inventory;
