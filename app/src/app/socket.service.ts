import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:3001');
  }
  getWeight() {
    return new Observable((observer) => {
      this.socket.on('weight', (message) => {
        observer.next(message);
      });
    });
  }

  getBuffetType() {
    return new Observable((observer) => {
      this.socket.on('buffetType', (message) => {
        observer.next(message);
      });
    });
  }

  getTotal() {
    return new Observable((observer) => {
      this.socket.on('total', (message) => {
        observer.next(message);
      });
    });
  }

  getOrder() {
    return new Observable((observer) => {
      this.socket.on('order', (message) => {
        observer.next(message);
      });
    });
  }
}
