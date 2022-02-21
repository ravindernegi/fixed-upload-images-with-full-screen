import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography
} from "@material-ui/core";

export default function MediaCard({ productType }) {
  const mappedErrorMessage =
    productType.hasError &&
    productType.msg?.validationMessages.map((data) => data.validationMessages);

  return (
    <Card
      style={{
        border: productType.hasError ? "1px solid red" : "unset"
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          height="140"
          image={URL.createObjectURL(productType.imageFile)}
        />
        {productType.hasError &&
          mappedErrorMessage.map((msg, idx) => (
            <Box key={idx + msg} marginTop={idx === 0 ? 2 : 1}>
              <Typography color="secondary">{msg}</Typography>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
}
