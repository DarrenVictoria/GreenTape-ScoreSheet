// src/app/converters/committee.converter.ts

import { Injectable } from '@angular/core';
import { Committee } from '../models/committee.model';

@Injectable()
export class CommitteeConverter {
  convertCommittees(committees: Committee[]): Committee[] {
    // The converter is now empty, as all data comes from the database
    // You can add any future conversion logic here if needed
    return committees;
  }
}