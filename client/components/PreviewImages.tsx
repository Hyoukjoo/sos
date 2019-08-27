import React from 'react';

const PreviewImages = ({ image }) => {
  return <img key={image.indexOf(image)} src={image} />;
};

export default PreviewImages;
