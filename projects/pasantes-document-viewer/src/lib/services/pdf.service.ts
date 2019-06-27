// angular dependencies
import { Injectable             } from '@angular/core';

// pdfjs module dependencies
import { getDocument,
         PDFDocumentLoadingTask } from 'pdfjs-dist/lib/pdf.js';


@Injectable()
export class PDFService {
  public loadDocument(source: string): PDFDocumentLoadingTask {
    return getDocument(source);
  }
}
