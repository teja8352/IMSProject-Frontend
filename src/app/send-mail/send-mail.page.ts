import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database/database.service';
import { CommonService } from '../services/common/common.service';
import { Router } from '@angular/router';
import { sendMailType } from '../models/model';
//import { AlertController, NavController } from 'ionic-angular';
import { EmailProvider } from './email.service';
import { ImageProvider } from './image.service'; 


@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.page.html',
  styleUrls: ['./send-mail.page.scss'],
})
export class SendMailPage implements OnInit {

  public sendMailDetails: Array<sendMailType> = [];
  public sendMailForm: FormGroup;
  private attachment: any;
  constructor(private database: DatabaseService, 
              private formBuilder: FormBuilder, 
              private router: Router, 
              public emailProvider: EmailProvider,
              public imageProvider: ImageProvider, 
              private commonService: CommonService) 
        {
      this.sendMailForm = this.formBuilder.group({
      toemail: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])] 
    })

  }
  ngOnInit() {
  }

  retrieveAttachment() : void
  {
     this.imageProvider.selectPhotograph()
     .then((attachment : any) =>
     {
        // Assign retrieved image to private property
        // which we'll subsequently access within the
        // sendMailSubmit method
        this.attachment  = attachment;
     });
  }  

     /**
    *
    * @public
    * @method sendMailSubmit
    * @return {none}
    */
   sendMailSubmit(body: any) : void
   {
      // Retrieve the validated form fields
      let from 	  : string		= body.toemail["fromemail"].value,
          to 		  : string		= body.toemail["toemail"].value,
          cc 		  : string		= body.toemail["toemail"].value,
          bcc 		: string		= body.toemail["toemail"].value,
          subject : string		= "Welcome mail",
          message : string		= body.message["message"].value

      // Has the user selected an attachment?
      if(this.attachment.length > 1)
      {
         // If so call the sendEmail method of the EmailProvider service, pass in
         // the retrieved form data and watch the magic happen! :)
         this.emailProvider.sendEmail(to, cc, bcc, this.attachment, subject, message);
         this.commonService.presentToast(' Successfully you need to select an attachment');
      }
      else
      {
         // Inform the user that they need to add an attachment
         this.commonService.presentToast('Error !!! you need to select an attachment');
      }
   }

}
