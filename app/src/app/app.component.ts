import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './socket.service';
import { MealComponent } from './meal/meal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MealComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  weight: any = 0;
  buffetType: any = '';
  total: any = '';
  meals: any[] = [];

  constructor(private socketService: WebsocketService) {}

  ngOnInit(): void {
    this.socketService.getWeight().subscribe((data) => {
      this.weight = data;
    });

    this.socketService.getBuffetType().subscribe((data) => {
      this.buffetType = data;
    });

    this.socketService.getTotal().subscribe((data) => {
      this.total = data;
    });

    this.socketService.getOrder().subscribe((data) => {
      this.meals.unshift(JSON.parse(data as string));
    });
  }
}
