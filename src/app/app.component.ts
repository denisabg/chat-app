import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './services/data-service';
import { IMessage } from './interfaces/message';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'chat-app';
  @Input() user: string;
  @Input() message: string;
  public chatHub: IMessage[] = []

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    let dateNow: Date = new Date();

    interval(10000).subscribe((counter) => {

      let timeStamp = this.chatHub.length > 0 ? this.chatHub[this.chatHub.length - 1].DateStamp : dateNow.toUTCString()

      console.log(`timeStamp =onInit== ${timeStamp}`);

      this.dataService.getMessages(timeStamp)
        .subscribe(res => {
          Array.prototype.push.apply(this.chatHub, res);

          console.log(counter + ': reloaded from ChatHub');

          this.chatHub = this.chatHub.filter((test, index, array) =>
            index === array.findIndex((findTest) => {
              return findTest.Id === test.Id && findTest.DateStamp === test.DateStamp;
            }
            ));
        });
    });
  }



  sendData() {
    let $this = this;
    let dateNow: Date = new Date();

    if (!$this.user || !$this.message) {
      console.warn(' (!this.user || !this.message) are undefined ');
      return;
    }
    let timeStamp = $this.chatHub.length > 0 ? $this.chatHub[$this.chatHub.length - 1].DateStamp : dateNow.toUTCString();
    console.log(`timeStamp =clicked== ${timeStamp}`);

    let Message: IMessage = {
      Id: $this.chatHub.length.toString(),
      DateStamp: dateNow.toUTCString(),
      UserName: $this.user,
      Message: $this.message
    }

    $this.dataService
      .addMessage(Message)
      .subscribe(res => {
        if (res) {
          $this.chatHub.push(res)
          $this.getData(res.DateStamp);
        }
      });
    return $this.message = '';
  }


  getData(dateNow) {
    let timeStamp = dateNow.toISOString();
    let count = this.chatHub.length;
    if (count > 0) {
      let lastMessage = this.chatHub.sort((a, b) => a.DateStamp >= b.DateStamp ? 0 : 1)[0];
      timeStamp = lastMessage.DateStamp;
    }

    this.dataService.getMessages(timeStamp)
      .subscribe(res => {

        Array.prototype.push.apply(this.chatHub, res);

        this.chatHub = this.chatHub.filter((test, index, array) =>
          index === array.findIndex((findTest) => {
            return findTest.Id === test.Id && findTest.DateStamp === test.DateStamp;
          }
          ));
      });
  }

  ngOnDestroy() {

  }
}
