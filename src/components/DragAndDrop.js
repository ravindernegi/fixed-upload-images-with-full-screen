import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

const DragAndDrop = (props) => {
  const [drag, setDrag] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const dropRef = useRef();
  // added upload methods
  const onUploadImage = (files) => {
    const fileList = Array.from(files);
    const images = fileList.map((image) => {
      return {
        productCode:
          image?.name?.replace(/\.[^/.]+$/, '').split('_')[1] ||
          image?.name?.replace(/\.[^/.]+$/, '').split('_')[0] ||
          '',
        productName: '',
        productCategory: null,
        imageFileName: image?.name?.replace(/\.[^/.]+$/, '') || '',
        imageFile: image,
      };
    });

    props.processImages(images);
  };

  const handleDrag = (e) => {
    if (drag) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDragIn = (e) => {
    if (drag) {
      e.preventDefault();
      e.stopPropagation();
    }

    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e) => {
    if (drag) {
      e.preventDefault();
      e.stopPropagation();
    }

    setDragCounter(dragCounter - 1);
    if (dragCounter === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      props.enabled
    ) {
      onUploadImage(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
    }
    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  useEffect(() => {
    let div = dropRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
    }
  }, [dropRef]);

  //TODO: Rewrite this to a functional comp. Source: https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929

  return (
    <div ref={dropRef} style={{ overflow: 'hidden' }}>
      {props.children}
      {props.enabled && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
          style={{
            backgroundColor: 'rgba(255,255,255,.9)',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: drag ? 9999 : -9999,
            opacity: drag ? 1 : 0,
            transition: `${
              !drag ? 'z-index 0.6s,' : ''
            } opacity .3s cubic-bezier(0.0,0.0,0.2,1)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '15%',
              overflow: 'hidden',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: '#f26928',
              fontSize: 36,
            }}
          >
            <div>
              <Typography>Drop Images To Upload</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
