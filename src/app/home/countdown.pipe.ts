import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, timer } from "rxjs";

export interface ICountdown {
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Pipe({
  name: 'countdown',
  standalone: true,
})
export class CountdownPipe implements PipeTransform {
  transform(value: any): Observable<ICountdown> {
    return timer(0, 1000).pipe(map(() => this.calculate(value)))
  }

  private calculate(value: Date): ICountdown {
    const futureDate = new Date(value);
    const currentDate = new Date();
    let diff = Math.abs(futureDate.getTime() - currentDate.getTime()) / 1000;

    if (diff <= 0) {
      return {
        day: this.pad(0),
        hours: this.pad(0),
        minutes: this.pad(0),
        seconds: this.pad(0),
      }
    }

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;

    const hours = Math.floor(diff / 3600) % 24;
    diff -= hours * 3600;

    const minutes = Math.floor(diff / 60) % 60;
    diff -= minutes * 60;

    const seconds = Math.floor(diff % 60);

    return {
      day: this.pad(days),
      hours: this.pad(hours),
      minutes: this.pad(minutes),
      seconds: this.pad(seconds),
    }
  }

  private pad(number: number): string {
    return number < 10 ? `0${ number }` : `${ number }`;
  }
}
