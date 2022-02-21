import React from 'react';
import './styles.css';
import ProductCard from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct } from './actions';
import UploadImage from './components/UploadImage';
import DragAndDrop from './components/DragAndDrop';

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);

  const processImages = (productImages) => {
    dispatch(uploadProduct(productImages));
  };

  return (
    <div className='App'>
      <DragAndDrop enabled={true} processImages={processImages}>
        {(products || []).map((product, index) => (
          <ProductCard product={product} />
        ))}

        <UploadImage processImages={processImages} />
      </DragAndDrop>
    </div>
  );
}
