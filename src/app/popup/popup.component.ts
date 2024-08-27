import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

interface Committee {
  name: string;
  members: any[]; // You can replace 'any' with a more specific type if needed
  responses: {
    shortlist: any[];
    preaward: any[];
    allShortlistPreaward: any[];
  };
}

@Component({
  selector: 'app-popup',
  template: `
    <div *ngIf="isOpen" class="popup-overlay" (click)="close.emit()">
      <div class="popup-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">×</button>
        <div class="tabs">
          <button *ngFor="let committee of committees; let i = index"
                  [class.active]="activeCommitteeIndex === i"
                  (click)="setActiveCommittee(i)">
            {{ committee.name }}
          </button>
        </div>
        <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header" (click)="toggleAccordion('scoresheet')">
              Score Sheet
              <span class="collapse-arrow" [class.collapsed]="activeAccordion !== 'scoresheet'"><i class="fa-solid fa-chevron-down"></i></span>
            </h2>
            <div class="accordion-content" [class.active]="activeAccordion === 'scoresheet'">
              <div class="score-info">
                <p>Score Range: 0 - 10</p>
                <i class="fas fa-download export-icon" (click)="exportScoreSheet()"></i>
              </div>
              <ng-content select="[scoresheet]"></ng-content>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" (click)="toggleAccordion('responses')">
              Responses
              <select (change)="onResponseFilterChange($event)" class="green-select">
                <option value="all-shortlist">All-Shortlist</option>
                <option value="all-preaward">All-PreAward</option>
                <option value="all-shortlist-preaward">All Shortlist & Pre-Award</option>
              </select>
              <span class="collapse-arrow" [class.collapsed]="activeAccordion !== 'responses'"><i class="fa-solid fa-chevron-down"></i></span>
            </h2>
            <div class="accordion-content" [class.active]="activeAccordion === 'responses'">
              <!--<p>{{ committees[activeCommittee] }} results</p>>-->
              <ng-content select="[responses]"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .popup-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      width: 90%;
      height: 90%;
      overflow: auto;
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .tabs {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .tabs button {
      padding: 10px 20px;
      margin: 0 5px 0 0;
      border: none;
      background-color: #f0f0f0;
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .tabs button.active {
      background-color: #4c7a96;
      color: white;
    }
    .accordion-item {
      margin-bottom: 10px;
    }
    .accordion-header {
      background-color: #0c5d83;
      color:#ffffff;
      padding: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .accordion-content {
      display: none;
      padding: 10px;
    }
    .accordion-content.active {
      display: block;
    }
    .collapse-arrow {
      transition: transform 0.3s ease;
      font-size:0.9em;
    }
    .collapse-arrow.collapsed {
      transform: rotate(-90deg);
    }
  .score-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
    }

    .score-info p {
      margin: 0;
      font-weight: bold;
    }

    .export-icon {
      cursor: pointer;
      font-size: 1.2em;
      color: #2e86c1;
    }

    .export-icon:hover {
      color: #45a049;
    }

    .green-select {
      background-color: #2e86c1;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
    }

    .response-card {
      background-color: #bef3be;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      margin-top: 10px;
    }

    .response-card.not-shortlisted {
      border: 2px solid red;
    }

    .response-card.shortlisted {
      border: 2px solid darkgreen;
    }
  `]
})
export class PopupComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() committees: Committee[] = [];
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() committeeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() responseFilterChange: EventEmitter<string> = new EventEmitter<string>();

  activeCommitteeIndex: number = 0;
  activeAccordion: string | null = null;

  ngOnInit() {
    this.responseFilterChange.emit('all-shortlist');
  }

  setActiveCommittee(index: number) {
    this.activeCommitteeIndex = index;
    this.committeeChange.emit(index);
  }

  toggleAccordion(accordion: string) {
    this.activeAccordion = this.activeAccordion === accordion ? null : accordion;
  }

  exportScoreSheet() {
    console.log('Exporting score sheet...');
  }

  onResponseFilterChange(event: Event) {
    const filter = (event.target as HTMLSelectElement).value;
    this.responseFilterChange.emit(filter);
  }
}