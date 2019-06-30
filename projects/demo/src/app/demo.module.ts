// angular dependencies
import { BrowserModule                } from '@angular/platform-browser';
import { NgModule                     } from '@angular/core';

// demo application dependencies
import { BootstrapComponent           } from './components/bootstrap/bootstrap.component';

// document viewer library dependencies
import { PasantesDocumentViewerModule } from 'pasantes-document-viewer';


@NgModule({
  declarations: [ BootstrapComponent           ],
  imports:      [ BrowserModule,
                  PasantesDocumentViewerModule ],
  providers:    [                              ],
  bootstrap:    [ BootstrapComponent           ]
})
export class DemoModule { }
