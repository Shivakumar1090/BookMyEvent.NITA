const PDFDocument = require('pdfkit');
const fs = require('fs');
const generateQRCode = require('./qrcode');
const DOMAIN = "http://localhost:3002/";
const puppeteer = require("puppeteer");

const generateBookingTicketPDF = async({event, userId, filePath}) => {
    if (!filePath) {
        throw new Error('File path is missing.');
    }
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        <!--
        <!-- <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script> -->
        <style>
          /* Add your CSS styles here */
          container{
            font-family: 'Poppins', sans-serif;
            border-radius: 1px solid black;
            margin: 10px;
            padding: 10px;
            display: block;
            justify-content: center;
            align-items: center;
          }
          img{
            width: 80%;
            height: 50%; 
            object-fit: cover;
          }
          name{
            font-family: 'Poppins', sans-serif;
            font-size: 25px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
            <h1 class="name">${event.name}</h1>
            
            <div>
              <i class="fa-solid fa-location-pin"></i>
              <p>event.venue</p>
            </div>
            <i class="fa-regular fa-location-dot"></i>
            <i class="material-icons">location_on</i>
        </div>
      </body>
    </html> 
    `;

    await page.setContent(content);

    // Generate PDF
    await page.pdf({ path: 'output.pdf', format: 'A4' });

    await browser.close();
}

module.exports = generateBookingTicketPDF;
