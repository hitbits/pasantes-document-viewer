// Type definitions for pdfjs-dist@2.0.943
// Project: PDF.js
// Definitions by: Javier Sanchez Ochando <jsanchez@pasant.es>

declare module 'pdfjs-dist/lib/web/pdf_viewer.js' {
  interface PDFViewerOptions {
      container: HTMLElement;
      viewer?: HTMLElement;
      textLayerMode?: TextLayerMode;
  }

  class BaseViewer {
    constructor(options: PDFViewerOptions);
  }

  class PDFViewer extends BaseViewer {}
}
