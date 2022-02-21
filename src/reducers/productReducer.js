import { v4 as uuidV4 } from "uuid";
import { appConstants } from "../constants";

export const initialState = {
  products: [],
  errors: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return action.payload.reduce(
        (
          state,
          {
            productCode,
            productName,
            productCategory,
            imageFile,
            imageFileName
          }
        ) => {
          const shouldUpdate = state.products.some(
            (product) => product.productCode === productCode
          );

          if (shouldUpdate) {
            return {
              ...state,
              products: state.products.map((product) =>
                product.productCode === productCode
                  ? {
                      ...product,
                      productImages: product.productImages.concat({
                        id: uuidV4(),
                        imageFile,
                        imageFileName
                      })
                    }
                  : product
              )
            };
          }

          return {
            ...state,
            products: state.products.concat({
              productCode,
              productName,
              productCategory,
              productExisting: true,
              productImages: [
                {
                  id: uuidV4(),
                  imageFile,
                  imageFileName
                }
              ]
            })
          };
        },
        state
      );

    case appConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          productImages: product.productImages.map((p) => {
            const isErrorMatches = state.errors.find(
              (data) => data.id?.replace(/\.[^/.]+$/, "") === p.imageFileName
            );

            return {
              ...p,
              hasError: isErrorMatches ? true : false,
              msg: isErrorMatches
                ? state.errors.find(
                    (data) =>
                      data.id?.replace(/\.[^/.]+$/, "") === p.imageFileName
                  )
                : []
            };
          })
        }))
      };

    default:
      return state;
  }
};

export default appReducer;
