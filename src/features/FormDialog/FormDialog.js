import React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  FormLabel,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import FormField from "../FormField/FormField";

function FormDialog({
  fields = [],
  onSubmit,
  initialState = {},
  options = {},
  ...dialogProps
}) {
  return (
    <Dialog {...dialogProps}>
      <Formik
        onSubmit={async (values, meta) => {
          if (onSubmit) {
            const result = Promise.resolve(onSubmit(values));
            await result;
          }
          dialogProps.onClose();
        }}
        initialValues={initialState}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
              <FormLabel>Crear Producto</FormLabel>
              {fields?.map((field) => (
                <FormField
                  {...field}
                  options={options[field.name] ? options[field.name] : []}
                />
              ))}
            </DialogContent>

            <DialogActions>
              <Button color="default" onClick={dialogProps.onClose}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Guardar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default FormDialog;
