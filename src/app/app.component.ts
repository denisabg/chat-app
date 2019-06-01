import { Component, Input } from '@angular/core';
import { ChatService} from './services/chat-service';
import { IMessage } from './interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  @Input() user: string;
  @Input() message: string;

  constructor(){}
  
  public chatHub: IMessage[]=[]
  private chatMessage: IMessage;
  private dataService: ChatService;

  sendData(){
    this.chatMessage={
      UserName: this.user,
      ChatMessage: this.message
    }

    //TODO: reopen after URI released 
    //this.dataService.addMessage(this.chatMessage).subscribe(res=>{
       this.chatHub.push(this.chatMessage);
    //});
    this.message='';

  }

  getData(){
    
  }
}
