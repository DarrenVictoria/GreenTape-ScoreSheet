// src/app/services/committee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Committee } from '../models/committee.model';
import { InMemoryDbService } from './in-memory-db.service';

@Injectable()
export class CommitteeService {
  private apiUrl = 'http://api.example.com/committees'; // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private inMemoryDbService: InMemoryDbService
  ) { }

  getCommittees(): Observable<Committee[]> {
    if (this.shouldUseRealDb()) {
      return this.http.get<Committee[]>(this.apiUrl);
    } else {
      return of(this.inMemoryDbService.getCommittees());
    }
  }

  private shouldUseRealDb(): boolean {
    return window.location.href.includes('use-real-db');
  }
}