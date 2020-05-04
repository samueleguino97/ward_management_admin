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
import {
  Add,
  Delete,
  ArrowForward,
  ArrowRight,
  ArrowRightAlt,
  ArrowLeft,
} from "@material-ui/icons";

import classes from "./Movements.module.scss";
import { useMovements } from "../../hooks/db";

function Movements() {
  const [movements, { deleteMovement }] = useMovements();

  return (
    <Card className={classes.container}>
      <CardHeader
        title="Movimientos"
        action={
          <IconButton style={{ marginTop: 8 }}>
            <Add />
          </IconButton>
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
