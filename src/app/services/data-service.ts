import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMessage } from '../interfaces/message';
import { Observable } from 'rxjs';
import { tap, last } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messagesList: Array<IMessage>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET',
      'Authorization': 'my-new-auth-token',
      'Api-Key':'{1d585c8e-a7e4-4ae8-9aa3-1819ab9d1a66}'
    })
  };
  
  constructor(public http: HttpClient) {    
  }


  getMessages(timestamp):Observable<Array<IMessage>> {
    return this.http.get<Array<IMessage>>(environment.servers.api+`/Message?timeStamp=${timestamp}`).pipe(
      tap(res => {
        this.messagesList=res;
    }));
  }

  addMessage(message: IMessage):Observable<IMessage>{
    return this.http
    .post<IMessage>(environment.servers.api+'/Message', message,this.httpOptions)
    .pipe(tap(res=>{
        res;
    }));
  }
}
