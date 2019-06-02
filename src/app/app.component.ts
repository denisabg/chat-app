import { Component, Input } from '@angular/core';
import { ChatService} from './services/chat-service';
import { IMessage } from './interfaces/message';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  @Input() user: string;
  @Input() message: string;

  constructor(){
  }
  
  public chatHub: IMessage[]=[]
  private chatMessage: IMessage;
  private dataService: ChatService;
  private format: string= ('dd/MM/yyyy  hh:mm:ss');

  sendData(){
    let dateNow : Date = new Date();
    // console.log(`date.now === ${ dateNow.toISOString() }`);
    // console.log(`this.user === ${ this.user}`);
    // console.log(`this.message === ${ this.message }`);

    if(!this.user || !this.message){
      console.warn(' (!this.user || !this.message) are undefined ');
      return;
    }

    this.chatMessage={
      DateStamp: dateNow.toISOString(),
      UserName: this.user,
      ChatMessage: this.message
    }

    //TODO: reopen after URI released 
    //this.dataService.addMessage(this.chatMessage).subscribe(res=>{
       this.chatHub.push(this.chatMessage);
    //});

    this.message='';
    return;
  }

  getData(){
    
  }
}
