import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-row',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.css']
})
export class MemberRowComponent {
  @Input() member: any;
  expandedSection: string | null = null;

  toggleExpand(sectionName: string) {
    this.expandedSection = this.expandedSection === sectionName ? null : sectionName;
  }
}