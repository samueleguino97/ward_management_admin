import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  List,
  Card,
  ListItem,
  CardContent,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  ListItemSecondaryAction,
  IconButton,
  Button,
  FormLabel,
  Link,
} from "@material-ui/core";

import classes from "./CratedFormDetail.module.scss";
import { useDbCollection } from "../../hooks/db";
import { Add, Delete } from "@material-ui/icons";
import produce from "immer";

const TABS = [
  { label: "Basico", value: "basic" },
  { label: "Avanzado", value: "advanced" },
];
function CreatedFormDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("basic");

  const [surveys, { updateItem }] = useDbCollection("surveys");

  let survey = surveys.find((item) => item._id === id);
  if (id === "new") {
    survey = {};
  }
  const [surveyInfo, setSurveyInfo] = useState({ ...survey });
  const [fields, setFields] = useState(survey?.fields || []);

  function onChangeField(value, field, index) {
    setFields(
      produce(fields, (draft) => {
        draft[index][field] = value;
      })
    );
  }

  function onChangeInfo(value, field, index) {
    setFields(
      produce(surveyInfo, (draft) => {
        draft[field] = value;
      })
    );
  }
  function saveSurvey() {
    updateItem(survey._id, { ...surveyInfo, fields });
  }

  return (
    <Container style={{ overflow: "auto", maxHeight: "100%" }}>
      <Box display="flex" justifyContent="space-evenly" padding="24px">
        {TABS.map((tab) => (
          <Box
            onClick={() => setActiveTab(tab.value)}
            className={
              activeTab === tab.value
                ? classes.tab + " " + classes.active
                : classes.tab
            }
          >
            <Typography>{tab.label}</Typography>
          </Box>
        ))}
      </Box>
      {activeTab === "basic" && (
        <List>
          <Box display="flex" flexDirection="column">
            <FormLabel>Informacion de la Encuesta</FormLabel>
            <div>
              <TextField
                onChange={(ev) => onChangeInfo(ev.target.value, "purpose")}
                value={surveyInfo.purpose}
                label="Proposito de la Encuesta"
              />
              <TextField
                onChange={(ev) => onChangeInfo(ev.target.value, "createdBy")}
                value={surveyInfo.createdBy}
                label="Organizacion"
              />
            </div>
            <FormLabel>Link:</FormLabel>
            <Link
              target="_blank"
              href="http://thisisalink.com"
              underline="hover"
            >
              http://thisisalink.com
            </Link>
            <FormLabel>Preguntas</FormLabel>
          </Box>
          {fields?.map((field, fieldIndex) => (
            <Card key={field.id} style={{ marginTop: 12 }}>
              <CardContent>
                <ListItem>
                  <TextField
                    onChange={(ev) =>
                      onChangeField(ev.target.value, "title", fieldIndex)
                    }
                    value={field.title}
                    label="Titulo"
                  />
                  <Select
                    style={{ margin: 10 }}
                    value={field.type}
                    label="Tipo de Pregunta"
                  >
                    <MenuItem value="text">Texto</MenuItem>
                  </Select>
                  <ListItemSecondaryAction>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </CardContent>
            </Card>
          ))}
          <Box marginTop="12px" display="flex" justifyContent="center">
            <Button
              color="primary"
              onClick={() =>
                setFields([
                  ...fields,
                  { title: "", description: "", type: "text" },
                ])
              }
              style={{ cursor: "pointer" }}
              color="primary"
            >
              Añadir Pregunta +
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={saveSurvey}
              style={{ cursor: "pointer" }}
              color="primary"
            >
              Guardar Encuesta
            </Button>
          </Box>
        </List>
      )}

      {activeTab === "advanced" && (
        <Box display="flex" justifyContent="center">
          <Typography variant="h5">
            Todavia no se puede crear formularios avanzados
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default CreatedFormDetail;
