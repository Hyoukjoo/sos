import React from 'react';

const PreviewImages = ({ images }) => {
  if (images) {
    return images.map(image => {
      return <img key={images.indexOf(image)} src={image} style={{ width: '100px', height: '100px' }} />;
    });
  } else {
    return <div style={{ width: '100px', height: '100px', backgroundColor: 'black' }} />;
  }
};

export default PreviewImages;
