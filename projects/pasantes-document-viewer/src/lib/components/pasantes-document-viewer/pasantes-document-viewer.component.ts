// angular dependencies
import { AfterViewInit,
         Component,
         ElementRef,
         ViewChild      } from '@angular/core';

// pdfjs module dependencies
import { getDocument    } from 'pdfjs-dist/build/pdf.js';
import { PDFViewer      } from 'pdfjs-dist/web/pdf_viewer.js';


@Component({
  selector:    'pasantes-document-viewer',
  templateUrl: './pasantes-document-viewer.component.html',
  styleUrls: [ './pasantes-document-viewer.component.scss' ]
})
export class PasantesDocumentViewerComponent implements AfterViewInit {
  @ViewChild('container')
  private container: ElementRef<HTMLElement>;
  private viewer: any;


  ngAfterViewInit() {
    // initialize pdf viewer
    this.viewer = new PDFViewer({
      container: this.container.nativeElement,  // set container element
      textLayerMode: 0                          // disable text layer
    });
  }
}
