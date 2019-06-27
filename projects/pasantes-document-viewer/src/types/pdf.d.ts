// Type definitions for pdfjs-dist@2.0.943
// Project: PDF.js
// Definitions by: Javier Sanchez Ochando <jsanchez@pasant.es>

declare module 'pdfjs-dist/lib/pdf.js' {
  function getDocument(source: string): PDFDocumentLoadingTask;

  interface PDFDocumentLoadingTask {
    readonly promise: Promise<PDFDocumentProxy>;
    destroy();
  }

  interface PDFDocumentProxy {
    readonly numPages: number;
    readonly fingerprint: string;

    getPage(pageNumber: number): Promise<PDFPageProxy>;
    getPageIndex(reference: PDFPageReference): Promise;
    destroy(): void;
  }

  interface PDFPageReference {
    number: number;
    gen: number;
  }
}
