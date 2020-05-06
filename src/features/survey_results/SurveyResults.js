import React from "react";
import { useDbCollection } from "../../hooks/db";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  Typography,
  FormLabel,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

function SurveyResults() {
  const [answers] = useDbCollection("answers");
  const { id } = useParams();
  const surveyAnswers = answers.filter((answer) => answer.survey_id === id);
  return (
    <div style={{ overflow: "auto", maxHeight: "100%" }}>
      <List>
        {surveyAnswers?.map((answer) => (
          <Card style={{ margin: 12 }}>
            {Object.keys(answer)
              .filter((key) => !key.includes("id"))
              .map((key) => (
                <ListItem style={{ display: "block" }}>
                  <div>
                    <FormLabel>{key}</FormLabel>
                  </div>
                  <div>
                    <Typography>{answer[key]}</Typography>
                  </div>
                </ListItem>
              ))}
          </Card>
        ))}
      </List>
    </div>
  );
}

export default SurveyResults;
