import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WebSpeechComponent } from './web-speech/web-speech.component';
import { IbmApiComponent } from './ibm-api/ibm-api.component';
import { GoogleApiComponent } from './google-api/google-api.component';
import { DialogflowComponent } from './dialogflow/dialogflow.component';
import { AzureApiComponent } from './azure-api/azure-api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WebSpeechComponent,
    IbmApiComponent,
    GoogleApiComponent,
    DialogflowComponent,
    AzureApiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
