import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { useDbCollection } from "../../hooks/db";
import { useParams } from "react-router-dom";
import produce from "immer";

function TakeSurvey() {
  const [surveys] = useDbCollection("surveys");
  const [answersList, { createItem }] = useDbCollection("answers");
  const { id } = useParams();
  const survey = surveys.find((item) => item._id === id) || {};

  const [answers, setAnswers] = useState({});
  function changeAnswer(field, value) {
    setAnswers(
      produce(answers, (draft) => {
        draft[field] = value;
      })
    );
  }
  function handleSave(ev) {
    ev.preventDefault();

    createItem({ ...answers, survey_id: id });
    sessionStorage.setItem("taken", "yes");
  }
  if (sessionStorage.getItem("taken")) {
    return (
      <Container>
        <Typography>Gracias por tomar esta encuesta!</Typography>
      </Container>
    );
  }

  return (
    <Container style={{ padding: 24 }}>
      <Card>
        <CardHeader
          title={
            <>
              <Typography variant="h6">
                Encuesta del {survey.createdBy}
              </Typography>
              <Typography variant="body1">
                Esta encuesta fue creada por {survey.createdBy} con el proposito
                de {survey.purpose}
              </Typography>
            </>
          }
        ></CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <Box display="flex" flexDirection="column">
              {survey.fields?.map((field) => (
                <TextField
                  multiline={true}
                  onChange={(ev) => changeAnswer(field.title, ev.target.value)}
                  value={answers[field.title]}
                  label={field.title}
                  required
                  type={field.type || "text"}
                />
              ))}
            </Box>
            <Button color="primary" variant="contained" type="submit">
              Enviar Respuestas
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TakeSurvey;
