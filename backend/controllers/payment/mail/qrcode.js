const QRCode = require('qrcode');

const generateQRCode = async({userId, eventId}) => {
  const dataToEncode = `${userId}-${eventId}`;
  const qrOptions = {
    errorCorrectionLevel: 'M', // Adjust as needed
    type: 'image/png', // You can also use 'image/jpeg' or 'image/svg' if preferred
  };

  try {
    const qrDataURL = await QRCode.toDataURL(dataToEncode, qrOptions);
    return qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
}

module.exports = generateQRCode;
