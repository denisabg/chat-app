import { Component, Input } from '@angular/core';
import { DataService} from './services/data-service';
import { IMessage } from './interfaces/message';
import { MatDialog } from '@angular/material';
import { AbstractFormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  @Input() user: string;
  @Input() message: string;

  constructor(private dataService: DataService){
  }
  
  

  public chatHub: IMessage[]=[]
  //public Message: IMessage;
  //private format: string= ('dd/MM/yyyy  hh:mm:ss');

  sendData(){
    let dateNow : Date = new Date();
    //  console.log(`date.now === ${ dateNow.toISOString() }`);
    //  console.log(`this.user === ${ this.user}`);
    //  console.log(`this.message === ${ this.message }`);

    if(!this.user || !this.message){
      console.warn(' (!this.user || !this.message) are undefined ');
      return;
    }

    let Message:IMessage ={
      Id: this.chatHub.length.toString(),
      DateStamp: dateNow.toISOString(),
      UserName: this.user,
      Message: this.message
    }

    // console.log(`Message === ${ Message }`);


    //TODO: reopen after URI released 
    this.dataService
    .addMessage(Message)
    .subscribe(res=>{
      if (res) {
        this.chatHub.push(res)
        this.getData(dateNow);
      }
    });

    this.message='';
    return;
  }

  getData(dateNow){
    //TODO: check sort order
    let timeShtamp = dateNow.toISOString();
    let count =this.chatHub.length;
    if( count > 0)
    {
      let lastMessage = this.chatHub.sort((a, b) => a.DateStamp >= b.DateStamp ? 0 : 1)[count-1];
      timeShtamp = lastMessage.DateStamp;
    }

    this.dataService.getMessages(timeShtamp)
    .subscribe(res=>{
      //var result = this.chatHub.concat(res).slice().reverse();
      Array.prototype.push.apply(this.chatHub, res);
    });
  }
}
