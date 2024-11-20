import React, { useState, ChangeEvent } from "react";
import { ImageToBase64, Base64ToImage } from "~/components/Base64Util";

export default function Base64Converter() {
  const [base64Image, setBase64Image] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBase64Image(reader.result);
          console.log("Base64 String:", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvertToImage = () => {
    setImageSrc(base64Image);
  };

  return (
    <div>
      <h1>Base64 Converter</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleConvertToImage}>Convert to Image</button>
      {base64Image && (
        <div>
          <textarea value={base64Image} readOnly rows={10} cols={50} />
        </div>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Converted" />
        </div>
      )}
    </div>
  );
};