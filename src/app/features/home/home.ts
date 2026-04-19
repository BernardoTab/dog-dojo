import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { interval, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  isRevealed = false;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private sub?: Subscription;
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.updateCountdown();

    // update every second
    this.sub = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private updateCountdown() {
    const now = new Date();

    // normalize to UTC
    const nowUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    ));

    const day = nowUTC.getUTCDay(); // 0 = Sunday

    let daysUntilMonday = (8 - day) % 7;
    if (daysUntilMonday === 0) {
      daysUntilMonday = 7;
    }

    const nextMonday = new Date(nowUTC);
    nextMonday.setUTCDate(nowUTC.getUTCDate() + daysUntilMonday);
    nextMonday.setUTCHours(0, 0, 0, 0);

    const diff = nextMonday.getTime() - nowUTC.getTime();

    const totalSeconds = Math.floor(diff / 1000);

    this.days = Math.floor(totalSeconds / (3600 * 24));
    this.hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;
    this.cdr.markForCheck(); // or this.cdr.detectChanges();
  }

}
