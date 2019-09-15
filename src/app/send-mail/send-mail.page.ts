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
   private attachment: any = 2;
   constructor(
      private database: DatabaseService,
      private formBuilder: FormBuilder,
      private router: Router,
      public emailProvider: EmailProvider,
      public imageProvider: ImageProvider,
      private commonService: CommonService) {
      this.sendMailForm = this.formBuilder.group({
         toemail: ['', Validators.compose([Validators.required, Validators.email])],
         subject: ['', Validators.compose([Validators.required])],
         message: ['', Validators.compose([Validators.required])],
      })
   }

   ngOnInit() {
   }

   retrieveAttachment(): void {
      this.imageProvider.selectPhotograph().then((attachment: any) => {
         // Assign retrieved image to private property
         // which we'll subsequently access within the
         // sendMailSubmit method
         this.attachment = attachment;
      });
   }


   //  *
   //  * @public
   //  * @method sendMailSubmit
   //  * @return {none}


   sendMailSubmit(body: any): void {
      // Retrieve the validated form fields
      let from: string = body.fromemail,
         to: string = body.toemail,
         cc: string = body.toemail,
         bcc: string = "",
         subject: string = "Welcome mail",
         message: string = body.message["message"]
      console.log(" 1.0 this.attachment value=" + this.attachment.length);
      console.log(" 2.0 body.toemail.value=" + body.toemail);

      // Has the user selected an attachment?
      if (this.attachment.length > 1) {
         console.log(" 2.1 to email=" + from + to);
         // If so call the sendEmail method of the EmailProvider service, pass in
         // the retrieved form data and watch the magic happen! :)
         console.log(" 3.0 body.toemail.value=" + body.message);

         this.emailProvider.sendEmail(from, to, subject, this.attachment, subject, message);
         console.log(" 4.0 body.toemail.value=" + body.message);

         this.commonService.presentToast(' Successfully you need to select an attachment');
         console.log(" 5.0 body.toemail.value=" + body.message);
      }
      else {
         this.emailProvider.sendEmail(from, to, subject, this.attachment, subject, message);
         // Inform the user that they need to add an attachment
         console.log(" 6.0 body.toemail.value=" + body.message);
         this.commonService.presentToast('Error !!! you need to select an attachment');
         console.log(" 7.0 body.toemail.value=" + body.message);
      }
   }

}
