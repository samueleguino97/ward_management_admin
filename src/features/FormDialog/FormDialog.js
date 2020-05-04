import React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import FormField from "../FormField/FormField";

function FormDialog({
  fields = [],
  onSubmit,
  initialState = {},
  ...dialogProps
}) {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Crear Producto</DialogTitle>

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
              {fields?.map((field) => (
                <FormField {...field} />
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
