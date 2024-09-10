import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  private subject!: Subject<any>;

  constructor() {}

  connect(url: string): Subject<any> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<any> {
    this.socket = new WebSocket(url);

    const observable = new Observable((observer) => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (error) => observer.error(error);
      this.socket.onclose = () => observer.complete();
    });

    const observer = {
      next: (message: string) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(message);
        }
      },
    };

    return Subject.create(observer, observable);
  }
}
