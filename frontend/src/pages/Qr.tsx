import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
function QrCode() {
    const token = localStorage.getItem("token");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const qrValue = `http://localhost:5173/scan?id=${id}&token=${token}`;
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Scan the QR Code
        </h1>

        <div className="p-4 bg-gray-50 rounded-md">
          <QRCode size={160} value={qrValue} />
        </div>
      </div>
    </div>
  );
}

export default QrCode;