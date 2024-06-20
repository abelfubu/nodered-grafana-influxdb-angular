import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { interval, map, switchMap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ChartModule, AsyncPipe],
  template: `<h1>OEE</h1>
    <router-outlet />
    <div class="card">
      <p-chart type="line" [data]="data$ | async" [options]="options" />
    </div>`,
})
export class AppComponent {
  private readonly service = inject(AppService);

  data$ = interval(5000).pipe(
    switchMap(() =>
      this.service.getTemperature().pipe(
        map((result) => ({
          labels: result.frames[0].data.values[0].map((v) =>
            v ? new Date(v).toLocaleDateString() : ''
          ),
          datasets: [
            {
              label: 'Temperatura',
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4,
              data: result.frames[0].data.values[1].map((v) => v || 0),
            },
          ],
        }))
      )
    )
  );

  options = {
    animation: { duration: 0 },
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
      },
    },
  };
}
