// This file assumes pdfjsLib is available globally, loaded from a CDN in index.html

declare const pdfjsLib: any;

export const parsePdf = async (file: File): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      try {
        const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let textContent = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          textContent += text.items.map((s: any) => s.str).join(' ') + '\n';
        }

        resolve(textContent);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        reject(new Error("Could not parse the PDF file. Please ensure it's a valid PDF."));
      }
    };

    fileReader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    fileReader.readAsArrayBuffer(file);
  });
};
