// angular dependencies
import { AfterViewInit,
         Component,
         ElementRef,
         Input,
         OnDestroy,
         ViewChild               } from '@angular/core';

// pdfjs module dependencies
import { PDFDocumentLoadingTask,
         PDFDocumentProxy        } from 'pdfjs-dist/lib/pdf.js';
import { TextLayerMode           } from 'pdfjs-dist/lib/web/ui_utils.js';
import { PDFViewer               } from 'pdfjs-dist/lib/web/pdf_viewer.js';

// pasantes document viewer dependencies
import { PDFService              } from '../../services/pdf.service';


@Component({
  selector:    'pasantes-document-viewer',
  templateUrl: './pasantes-document-viewer.component.html',
  styleUrls: [ './pasantes-document-viewer.component.scss' ],
  providers: [ PDFService                                  ]
})
export class PasantesDocumentViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false })
  private container: ElementRef<HTMLElement>;
  private viewer: PDFViewer;

  private loadingTask: PDFDocumentLoadingTask;
  private document: PDFDocumentProxy;

  @Input()
  private scale: string;

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
    this.loadingTask = this.pdfService.loadDocument(source);
    this.loadingTask.promise
      .then((document: PDFDocumentProxy) => {
        this.document = document;
        this.viewer.setDocument(document);
      }).catch((error: Error) => {
        console.log(error.message);
      });
  }

  constructor(private pdfService: PDFService) {
    this.scale = 'auto';
  }

  public ngAfterViewInit() {
    // initialize pdf viewer
    this.viewer = new PDFViewer({
      container: this.container.nativeElement,
      textLayerMode: TextLayerMode.DISABLE
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

  public onPagesInit(): void {
    this.setScale(this.scale);
  }

  public onWindowResize() {
    this.setScale(this.scale);
  }

  protected setScale(value: string) {
    // set scale value on viewer
    switch (value) {
      case 'auto':
      case 'page-actual':
      case 'page-fit':
      case 'page-height':
      case 'page-width':
        this.viewer.currentScaleValue = value;
        break;
      default:
        console.log(`Warning: '${value}' is not a valid scale value of document viewer. Setting scale value to 'auto'`);
        this.viewer.currentScaleValue = 'auto';
    }
  }
}
