import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL: string = 'http://www.server.com/api/';

  constructor(private httpClient: HttpClient) { }


  public getMessages() {
    return this.httpClient.get<IMessage[]>(`${this.apiURL}/GetAllMessages`);
  }

  public addMessage(message: IMessage){
    return this.httpClient.post<IMessage>(`${this.apiURL}/AddMessage`, message);
  }
}
