const puppeteer = require("puppeteer");
const fs = require("fs");

async function generatePDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load your HTML content
    const htmlContent = fs.readFileSync("resume.html", "utf8");

    // Set the content and render the PDF
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen"); // Ensure CSS is applied in the PDF

    // Generate PDF with custom size and margins
    await page.pdf({
      path: "RABINDRA_RESUME.pdf",
      width: "297mm", // Customize width
      height: "375mm", // Customize height
      printBackground: true,
      margin: {
        top: "10mm",
        right: "12mm",
        bottom: "0mm",
        left: "12mm",
      },
    });

    console.log("PDF generated successfully");

    await browser.close();
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

generatePDF();
