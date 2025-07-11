import { Image } from '@react-pdf/renderer'
import { useState } from "react"

const PDFImage = ({pix}) => {
  const [imgWidth, setImgWidth] = useState('');
  const img = new window.Image();
  img.src=pix;
  img.onload = () => {
    if (img.width > 500) {
      setImgWidth('400px');
    } else if (img.width > 290) {
      setImgWidth('300px');
    } else {
      setImgWidth('100px');
    }
  };
  return (
    <Image src={pix} style={{width: imgWidth, height: 'auto', paddingLeft:'20px', marginBottom: '10px'}} />
  )
};

export default PDFImage;
