import { useState } from "react";
import { ImageToBase64, Base64ToImage } from "~/components/Base64Util";

export default function Base64Converter() {
  const [base64Image, setBase64Image] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleBase64Generated = (base64: string) => {
    setBase64Image(base64);
    console.log("Base64 String:", base64);
  };

  const handleConvertToImage = () => {
    setLoading(true);
    setTimeout(() => {
      setImageSrc(base64Image);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-screen bg-white min-h-screen p-4">
      <h1 className="text-6xl font-bold text-center mb-8">Base64 Converter</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-2xl border rounded-lg p-4 shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Upload Image</h2>
            <ImageToBase64 onBase64Generated={handleBase64Generated} />
            {base64Image && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Base64 String:</h3>
                <textarea value={base64Image} readOnly rows={10} className="w-full mt-2 p-2 border rounded-lg" />
                <button onClick={handleConvertToImage} className="btn btn-primary mt-4">Convert to Image</button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-2xl border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Converted Image</h2>
            {loading ? (
              <div className="animate__animated animate__fadeIn">
                <p>Loading...</p>
              </div>
            ) : (
              imageSrc && (
                <div className="animate__animated animate__zoomIn">
                  <Base64ToImage base64String={imageSrc} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}