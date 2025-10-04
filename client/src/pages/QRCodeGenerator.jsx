import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
  const menuUrl = window.location.origin + "/menu";
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "menu-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">📱 QR Code Generator</h1>
        <p className="text-green-100">Generate QR codes for your digital menu</p>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Display */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Menu QR Code
            </h2>
            
            <div className="flex justify-center mb-6">
              <div className="bg-white p-6 rounded-xl border-4 border-gray-200">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={menuUrl}
                  size={size}
                  level="H"
                  includeMargin={includeMargin}
                  imageSettings={{
                    src: "/vite.svg",
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Scan this code to access the menu
              </p>
              <button
                onClick={downloadQRCode}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                📥 Download QR Code
              </button>
            </div>
          </div>

          {/* Settings & Information */}
          <div className="space-y-6">
            {/* Settings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    QR Code Size
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">{size}px × {size}px</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="margin"
                    checked={includeMargin}
                    onChange={(e) => setIncludeMargin(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <label htmlFor="margin" className="text-sm font-semibold text-gray-700">
                    Include margin
                  </label>
                </div>
              </div>
            </div>

            {/* URL Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Menu URL</h3>
              <div className="bg-gray-100 p-4 rounded-lg break-all">
                <code className="text-sm text-gray-800">{menuUrl}</code>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(menuUrl);
                  alert("✅ URL copied to clipboard!");
                }}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                📋 Copy URL
              </button>
            </div>

            {/* Instructions Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📖 How to Use</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Download the QR code image using the button above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Print it and display it at your cafeteria entrance or on tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Customers scan the code with their phones to view the menu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Orders are sent directly to the kitchen dashboard</span>
                </li>
              </ol>
            </div>

            {/* Tips Card */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Place QR codes at eye level for easy scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Use plastic sleeves to protect printed QR codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Include brief instructions: "Scan to view menu & order"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Test the QR code with multiple devices before printing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Print Template */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🖨️ Print-Ready Template
          </h3>
          <div className="max-w-2xl mx-auto border-4 border-dashed border-gray-300 p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🍽️ Digital Menu
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Scan the QR code below to view our menu and place orders
            </p>
            <div className="flex justify-center mb-6">
              <QRCodeSVG
                value={menuUrl}
                size={300}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-lg text-gray-600 mb-2">
              📱 Point your camera at the QR code
            </p>
            <p className="text-sm text-gray-500">
              No app needed • Fast & Contactless
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => window.print()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
            >
              🖨️ Print Template
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-template, .print-template * {
            visibility: visible;
          }
          .print-template {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}
