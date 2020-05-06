import React from "react";
import { Field } from "formik";
import { TextField, Select, MenuItem } from "@material-ui/core";

function getFieldComponent(type) {
  let FieldType = TextField;
  switch (type) {
    case "select":
      FieldType = Select;
      break;
    default:
      FieldType = TextField;
      break;
  }
  console.log(FieldType);
  return FieldType;
}

function FormField({ type = "text", ...fieldProps }) {
  return (
    <Field as={getFieldComponent(type)} {...fieldProps} type={type}>
      {type === "select" &&
        fieldProps?.options?.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
    </Field>
  );
}

export default FormField;
