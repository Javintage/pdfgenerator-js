const express = require('express');
const PDFDocument = require('pdfkit');

const app = express();

app.get('/generate-pdf', (req, res) => {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Create a buffer to store the PDF content
  let buffers = [];

  // When data is generated, push it to the buffer
  doc.on('data', (chunk) => {
    buffers.push(chunk);
  });

  // When the document is finished, concatenate all chunks into one buffer
  doc.on('end', () => {
    let pdfBuffer = Buffer.concat(buffers);
    // Send the PDF buffer as a response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  });

  // Add some content to the PDF
  doc
    .fontSize(24)
    .text('Hello, PDF!', { align: 'center' })
    .moveDown()
    .fontSize(16)
    .text('This is a simple PDF generated using Node.js and pdfkit.');

  // Finalize the PDF
  doc.end();
});

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});

