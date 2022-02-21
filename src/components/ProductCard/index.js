import React from "react";
import MediaCard from "../MediaCard";
import { Box, Grid, Button } from "@material-ui/core";
import { useFormik, FormikProvider } from "formik";
import ProductInputs from "../ProductInputs";
import { productSchema } from "../../schema";

export default function ProductCard(props) {
  const { product, categories } = props;

  const formik = useFormik({
    initialValues: {
      productCode: product.productCode || "",
      productName: product.productName || "",
      productCategory: product.productCategory || null,
      productExisting: product.productExisting,
      productImages: product.productImages || []
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <ProductInputs formik={formik} categories={categories} />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
          >
            Create
          </Button>
          <Grid component="div" container spacing={2}>
            <Grid component="div" item xl={10} lg={10} md={12} sm={12} xs={12}>
              <Grid component="div" container spacing={2}>
                {formik.values.productImages.map((data, index) => (
                  <Grid
                    key={data.id}
                    component="div"
                    item
                    xl={2}
                    lg={2}
                    md={2}
                    sm={12}
                    xs={12}
                  >
                    <MediaCard productType={data} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormikProvider>
  );
}
