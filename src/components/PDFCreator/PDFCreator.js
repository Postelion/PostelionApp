import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default {

    async Generate(firm)
    {
      const url = '/static/cv.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  pdfDoc.setTitle("Curriculum vitae");
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  var firma = firm.length>0?firm:"firme";
  firstPage.drawText("Wyrazam zgode na przetwarzanie moich danych osobowych przez "+firma+" w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.", {
    x: 25,
    y: 55,
    maxWidth:275,
    lineHeight:10,
    size: 7,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  })
  const pdfBytes = await pdfDoc.save()
  var blob = new Blob([pdfBytes], { type: "application/pdf" });
    var url2 = URL.createObjectURL(blob);
    window.open(url2, "_blank");

  }
}