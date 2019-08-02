import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

// import { WebSpeechService, RecognitionResult } from '../web-speech.service'
const MONTH = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]



@Component({
  selector: 'app-web-speech',
  templateUrl: './web-speech.component.html',
  styleUrls: ['./web-speech.component.css']
})
export class WebSpeechComponent implements OnInit {

  testForm: FormGroup;
  isListening: boolean = false;
  SpeechRecognition: any;
  speech: any;
  formControlCurr: string;

  constructor(
    // private speech: WebSpeechService,
    private ref: ChangeDetectorRef,
    private form: FormBuilder
  ) {
    this.isListening = false;
    if (window['webkitSpeechRecognition']) {
      this.SpeechRecognition = window['webkitSpeechRecognition'];
      this.speech = new this.SpeechRecognition()
      this.speech.lang = 'en-UK';
      this.speech.interimResults = false;
      this.speech.maxAlternatives = 1;
    }
  }

  ngOnInit() {
    this.testForm = this.form.group({
      'id':[null],
      'location': [null],
      'plant': [null],
      'date': [null]
    })
    var that = this;
    this.speech.onresult =  function (event) {
      console.log('processing...')
      that.isListening = false;
      that.ref.detectChanges();
      if (event.results[0][0]) {
        var val = event.results[0][0].transcript;
        let control = that.formControlCurr;
        if(control === 'date'){
          val = that.dateParser(val);
          console.log(val);
          that.testForm.get(control).setValue(val);
        } else {
          that.testForm.get(control).setValue(val);
        }
      }
    }
  }

  toggleListening(formControl: string): void {
    if (this.isListening) {
      console.log('aborting...')
      this.isListening = false;
      this.speech.stop();
    } else {
      console.log('listening...')
      this.formControlCurr = formControl;
      this.isListening = true;
      this.speech.start();
    }
  }

  onSubmit() {
    console.log(this.testForm.value)
  }

  dateParser(val: string) {
    let date = val.split(' ');
    let dd, mm, yyyy;
    date.forEach(elem => {
      let temp = parseInt(elem);
      // console.log(temp);
      if(isNaN(temp)){
        if(!MONTH.includes(elem.toLowerCase())){
          return;
        } else {
          mm = MONTH.indexOf(elem.toLowerCase()) + 1;
          if(mm < 10){
            mm = '0'+mm;
          }
          // console.log('mm', mm);
        }
      }
      else if (temp >= 1 && temp <= 31){
        dd = temp;
        // console.log('dd', dd);
      }
      else if (temp > 1000) {
        yyyy = temp;
        // console.log('yyyy', yyyy);
      }
    })
    return [yyyy,mm,dd].join('-');
    // return resp;
  }

}
