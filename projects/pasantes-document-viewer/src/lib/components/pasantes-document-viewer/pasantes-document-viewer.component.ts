// angular dependencies
import { AfterViewInit,
         Component,
         ElementRef,
         Input,
         OnDestroy,
         ViewChild      } from '@angular/core';

// pdfjs module dependencies
import { getDocument    } from 'pdfjs-dist/build/pdf.js';
import { PDFViewer      } from 'pdfjs-dist/web/pdf_viewer.js';


@Component({
  selector:    'pasantes-document-viewer',
  templateUrl: './pasantes-document-viewer.component.html',
  styleUrls: [ './pasantes-document-viewer.component.scss' ]
})
export class PasantesDocumentViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container')
  private container: ElementRef<HTMLElement>;
  private viewer: any;

  private loadingTask: any;
  private document: any;

  @Input()
  set source(source: string) {
    // checks that source is not null or empty
    if (!source) {
      return;
    }

    // clear previous loading tasks
    if (this.loadingTask) {
      this.loadingTask.destroy();
      this.loadingTask = null;
    }

    // load the requested source
    this.loadingTask = getDocument(source);
    this.loadingTask.promise.then(document => {
      this.document = document;
      this.viewer.setDocument(document);
    });
  }

  public ngAfterViewInit() {
    // initialize pdf viewer
    this.viewer = new PDFViewer({
      container: this.container.nativeElement,  // set container element
      textLayerMode: 0                          // disable text layer
    });
  }

  public ngOnDestroy() {
    // clear loading task
    if (this.loadingTask) {
      this.loadingTask.destroy();
      this.loadingTask = null;
    }

    // clear document proxy
    if (this.document) {
      this.document.destroy();
      this.document = null;
    }
  }
}
