import { ChangeEvent } from "react";

// Function to convert an uploaded image to a Base64 string
function ImageToBase64({ onBase64Generated }: { onBase64Generated: (base64: string) => void }) {
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onBase64Generated(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="btn btn-outline btn-accent cursor-pointer">
        Subir Portada
        <input type="file" onChange={handleImageUpload} className="hidden" />
      </label>
    </div>
  );
}

// Function to convert a Base64 string to an image
function Base64ToImage({ base64String }: { base64String: string }) {
  const imageSrc = base64String;

  return (
    <div>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Converted" />
        </div>
      )}
    </div>
  );
}

export { ImageToBase64, Base64ToImage };