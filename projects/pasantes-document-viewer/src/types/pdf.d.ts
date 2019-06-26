// Type definitions for pdfjs-dist@2.0.943
// Project: PDF.js
// Definitions by: Javier Sanchez Ochando <jsanchez@pasant.es>

declare module 'pdfjs-dist/lib/pdf.js' {
  interface PDFPromise<T> {
    isResolved(): boolean;
    isRejected(): boolean;
    resolve(value: T): void;
    reject(reason: string): void;
    then<U>(onResolve: (promise: T) => U, onReject?: (reason: string) => void): PDFPromise<U>;
  }

  interface PDFLoadingTask<T> {
    promise: PDFPromise<T>;
  }

  interface PDFProgressData {
    loaded: number;
    total: number;
  }

  interface PDFDocumentProxy {
    destroy(): void;
  }

  function getDocument(
    source: string,
    pdfDataRangeTransport?: any,
    passwordCallback?: (fn: (password: string) => void, reason: string) => string,
    progressCallback?: (progressData: PDFProgressData) => void
  ): PDFLoadingTask<PDFDocumentProxy>;
}
