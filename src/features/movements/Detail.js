import React from "react";
import { useDbCollection } from "../../hooks/db";
import { useParams, NavLink } from "react-router-dom";
import {
  Card,
  ListItem,
  ListItemText,
  Link,
  IconButton,
  List,
  Container,
} from "@material-ui/core";
import { ArrowRightAltOutlined, Delete } from "@material-ui/icons";
import classes from "./Movements.module.scss";

function Detail() {
  const [movements] = useDbCollection("movements");
  const { name } = useParams();
  const filteredMovements = movements?.filter(
    (movement) => movement.give_name === name || movement.take_name === name
  );
  return (
    <div style={{ overflow: "auto", maxHeight: "100%" }}>
      <Container>
        <List>
          {filteredMovements?.map((movement) => (
            <Card className={classes.card}>
              <ListItem className={classes.item}>
                <ListItemText>
                  {<span style={{ fontWeight: "bold" }}>Almacen</span>}
                </ListItemText>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {movement.type === "in" ? (
                    <ArrowRightAltOutlined
                      style={{
                        transform: "rotate(180deg)",
                        color: "green",
                      }}
                    />
                  ) : (
                    <ArrowRightAltOutlined style={{ color: "red" }} />
                  )}
                </div>
                <ListItemText>
                  <Link
                    component={NavLink}
                    to={
                      "/inventory/" + (movement.take_name || movement.give_name)
                    }
                  >
                    {movement.take_name || movement.give_name}
                  </Link>
                </ListItemText>
              </ListItem>
            </Card>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default Detail;
