import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestResponse } from './quest';

@Injectable({
  providedIn: 'root',
})
export class QuestService {

  private apiUrl = 'https://dog-dojo-api.onrender.com/api/weeklyquest'; // temporary

  constructor(private http: HttpClient) {}

  getQuests(): Observable<QuestResponse> {
    return this.http.get<QuestResponse>(this.apiUrl);
  }
}
