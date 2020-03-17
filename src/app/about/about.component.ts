import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IAlert } from '../_models/IAlert';
import { CommunicationService } from '../_services/communication.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  users$: Object;
  writeToMeForm: FormGroup;
  public alerts: Array<IAlert> = [];
  public globalResponse: any;
  isChecked: boolean = false;

  constructor(private fb: FormBuilder, private communicationService:CommunicationService) { }

  ngOnInit() {
    this.writeToMeForm = this.fb.group({
      Name:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Email:['',Validators.compose([Validators.required])],
      Message:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Subscribed:['true',Validators.required],

    });
  }
  formData = new FormData();
  OnSend( writeToMeForm)
  {
    this.formData = new FormData();
    this.formData.append('Name',  writeToMeForm.get('Name').value);
    this.formData.append('Email',  writeToMeForm.get('Email').value);
    this.formData.append('Text',  writeToMeForm.get('Message').value);
    this.formData.append('Subscribed',  writeToMeForm.get('Subscribed').value);
    //'property': this.isChecked  ? 'block' : 'none',

    this.alerts=[];

    //console.log(this.formData.get('testImage.jpg'));

    this.communicationService.sendMessage(this.formData)
        .subscribe((result) => {
          this.globalResponse = result;            
        },
        error => { //This is error part
          console.log(error.communication);
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Something went wrong!'
          });
        },
        () => {
            //  This is Success part
            // console.log(this.globalResponse);
            this.alerts.push({
              id: 1,
              type: 'success',
              message: 'your message was sent',
            });
            
            }
          );
      this.writeToMeForm.reset();
    }
    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }       
}

