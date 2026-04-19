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
    const saved = localStorage.getItem('isRevealed');

    this.isRevealed = saved === 'true';
    this.updateCountdown();

    // update every second
    this.sub = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  reveal(){
    this.isRevealed = true;
    localStorage.setItem('isRevealed', 'true');
  }

  resetReveal(){
    this.isRevealed = false;
    localStorage.removeItem('isRevealed');
  }

  private updateCountdown() {
    const now = new Date();

    const day = now.getDay(); // local day (0 = Sunday)

    let daysUntilMonday = (8 - day) % 7;
    if (daysUntilMonday === 0) {
      daysUntilMonday = 7; // always next Monday, not today
    }

    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);

    // IMPORTANT: local midnight
    nextMonday.setHours(0, 0, 0, 0);

    const diff = nextMonday.getTime() - now.getTime();

    const totalSeconds = Math.floor(diff / 1000);

    this.days = Math.floor(totalSeconds / 86400);
    this.hours = Math.floor((totalSeconds % 86400) / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;

    this.cdr.markForCheck();
  }

  get dayText(){
    let days = ""
    if(this.days > 0){
      if(this.days == 1){
        days = this.days+" day,"
      }
      else{
        days = this.days+" days,"
      }
    }
    return days;
  }
  
  get hourText(){
    let hours = ""
    if(this.hours > 0){
      if(this.hours == 1){
        hours = this.hours+" hour,"
      }
      else{
        hours = this.hours+" hours,"
      }
    }
    return hours;
  }

  
  get minuteText(){
    let minutes = ""
    if(this.minutes > 0){
      if(this.minutes == 1){
        minutes = this.minutes+" minute,"
      }
      else{
        minutes = this.minutes+" minutes,"
      }
    }
    return minutes;
  }

  get secondText(){
    let seconds = ""
    if(this.seconds > 0){
      if(this.seconds == 1){
        seconds = " and "+this.seconds+" second"
      }
      else{
        seconds = " and "+this.seconds+" seconds"
      }
    }
    return seconds;
  }

}
