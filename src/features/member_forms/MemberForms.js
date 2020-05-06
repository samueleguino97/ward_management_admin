import React from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Box,
  ListItem,
  ListItemSecondaryAction,
  List,
  Toolbar,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import { useDbCollection } from "../../hooks/db";
import { Add } from "@material-ui/icons";
import FormDialog from "../FormDialog/FormDialog";
import { useHistory, NavLink } from "react-router-dom";

function MemberForms() {
  const [surveys, { createSurvey }] = useDbCollection("surveys");
  const history = useHistory();
  return (
    <Container>
      <Box padding="12px">
        <Box marginBottom="10px">
          <Card>
            <Toolbar>
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Encuestas a los miembros</Typography>
                <IconButton>
                  <Add
                    color="primary"
                    onClick={() => history.push("/surveys/new")}
                  />
                </IconButton>
              </Box>
            </Toolbar>
          </Card>
        </Box>
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Creada por</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Resultados</TableCell>
                <TableCell>Proposito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys?.map((survey) => (
                <TableRow>
                  <TableCell>{survey.createdBy}</TableCell>
                  <TableCell>
                    <Link
                      component={NavLink}
                      to={`/surveys/take/${survey._id}`}
                    >
                      {"Tomar Encuesta"}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      component={NavLink}
                      to={`/surveys/results/${survey._id}`}
                    >{`Ver Resultados`}</Link>
                  </TableCell>
                  <TableCell>{survey.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
    </Container>
  );
}

export default MemberForms;
