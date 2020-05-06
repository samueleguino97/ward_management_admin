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
} from "@material-ui/core";
import {
  Add,
  Delete,
  ArrowForward,
  ArrowRight,
  ArrowRightAlt,
  ArrowLeft,
} from "@material-ui/icons";

import classes from "./Movements.module.scss";
import { useMovements, useItems, useDbCollection } from "../../hooks/db";
import FormDialog from "../FormDialog/FormDialog";

function Movements() {
  const [
    movements,
    { deleteItem: deleteMovement, createItem: createMovement },
  ] = useDbCollection("movements");
  const [items, { updateitem, ...actions }] = useDbCollection("items");
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  console.log(actions);
  return (
    <Card className={classes.container}>
      <FormDialog
        fields={
          modalType === "in"
            ? require("./inFormFields.json")
            : require("./formFields.json")
        }
        initialState={{}}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(values) => {
          createMovement({ ...values, type: modalType });
          const item = items.find((item2) => item2._id === values.item);
          updateitem({
            ...item,
            quantity:
              modalType === "in"
                ? +item.quantity + +values.quantity
                : +item.quantity - +values.quantity,
          });
        }}
        options={{
          item: items?.map((item) => ({ value: item._id, label: item.name })),
        }}
      />
      <CardHeader
        title="Movimientos"
        action={
          <>
            <IconButton
              onClick={() => {
                setOpen(true);
                setModalType("in");
              }}
              style={{ marginTop: 8 }}
            >
              <ArrowRightAlt
                style={{
                  transform: "rotate(180deg)",
                  color: "green",
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpen(true);
                setModalType("out");
              }}
              style={{ marginTop: 8 }}
            >
              <ArrowRightAlt style={{ color: "red" }} />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <List>
          {movements?.map((movement) => (
            <Card className={classes.card}>
              <ListItem className={classes.item}>
                <ListItemText>
                  {movement.take_name || (
                    <span style={{ fontWeight: "bold" }}>Almacen</span>
                  )}
                </ListItemText>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {movement.type === "in" ? (
                    <ArrowRightAlt
                      style={{
                        transform: "rotate(180deg)",
                        color: "green",
                      }}
                    />
                  ) : (
                    <ArrowRightAlt style={{ color: "red" }} />
                  )}
                </div>
                <ListItemText>{movement.give_name || "Anonimo"}</ListItemText>
                <ListItemText className={classes.actions}>
                  <IconButton onClick={() => deleteMovement(movement._id)}>
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

export default Movements;
