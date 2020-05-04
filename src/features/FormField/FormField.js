import React from "react";
import { Field } from "formik";
import { TextField } from "@material-ui/core";

function getFieldComponent(type) {
  let FieldType = TextField;
  switch (type) {
    default:
      return FieldType;
  }
}

function FormField({ type = "text", ...fieldProps }) {
  return <Field as={getFieldComponent(type)} {...fieldProps} type={type} />;
}

export default FormField;
