import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    if (window['SpeechRecognition']) {
      this.SpeechRecognition = window['SpeechRecognition'];
      this.speech = new this.SpeechRecognition()
      this.speech.lang = 'en-UK';
      this.speech.interimResults = false;
      this.speech.maxAlternatives = 1;
    }
    else if (window['webkitSpeechRecognition']) {
      this.SpeechRecognition = window['webkitSpeechRecognition'];
      this.speech = new this.SpeechRecognition()
      this.speech.lang = 'en-UK';
      this.speech.interimResults = false;
      this.speech.maxAlternatives = 1;
    }
    else if (window['msSpeechRecognition']) {
      this.SpeechRecognition = window['msSpeechRecognition'];
      this.speech = new this.SpeechRecognition()
      this.speech.lang = 'en-UK';
      this.speech.interimResults = false;
      this.speech.maxAlternatives = 1;
    }
  }

  ngOnInit() {
    this.testForm = this.form.group({
      'access':[null],
      'location': [null],
      'plant': [null],
      'date': [null]
    })

    //to use 'this' as reference to 'WebSpeechComponent' 
    // instead of 'this.speech.onresult'
    var that = this;
    this.speech.onresult =  function (event) {
      console.log('processing...')
      that.isListening = false;
      //to update UI
      that.ref.detectChanges();
      //if API recognizes something has been said
      if (event.results[0][0]) {
        var val = event.results[0][0].transcript;
        let control = that.formControlCurr;
        if(control === 'date'){
          val = that.dateParser(val);
        }  
        that.testForm.get(control).setValue(val);
      }
    }
  }


  //on mic-press
  toggleListening(formControl: string): void {
    if (this.isListening) {
      console.log('aborting...')
      this.isListening = false;
      //force triggers API to stop
      this.speech.stop();
    } else {
      console.log('listening...')
      this.formControlCurr = formControl;
      this.isListening = true;
      //triggers API to start
      this.speech.start();
    }
  }

  onSubmit() {
    console.log(this.testForm.value)
  }


  //method to convert date from spoken format to 'yyyy-mm-dd' format
  dateParser(val: string) {
    let date = val.split(' ');
    let dd, mm, yyyy;
    date.forEach(elem => {
      let temp = parseInt(elem);
      if(isNaN(temp)){
        if(!MONTH.includes(elem.toLowerCase())){
          return;
        } else {
          mm = MONTH.indexOf(elem.toLowerCase()) + 1;
          if(mm < 10){
            mm = '0'+mm;
          }
        }
      }
      else if (temp >= 1 && temp <= 31){
        dd = temp;
      }
      else if (temp > 1000) {
        yyyy = temp;
      }
    })
    return [yyyy,mm,dd].join('-');
  }

}
