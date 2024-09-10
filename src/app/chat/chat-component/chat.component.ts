import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    // this.wsService.connect('ws://localhost:8080').subscribe((msg) => {
    this.wsService.connect('https://websocket-server-production-55a3.up.railway.app/').subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage(): void {
    // this.wsService.connect('ws://localhost:8080').next(this.message);
    this.wsService.connect('https://websocket-server-production-55a3.up.railway.app/').next(this.message);
    this.message = '';
  }

}
