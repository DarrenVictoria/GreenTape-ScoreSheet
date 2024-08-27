import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommitteeService } from '../services/committee.service';
import { CommitteeConverter } from '../convertors/committee.converter.service';
import { Committee, Company, Member, Category, Section } from '../models/committee.model';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.css']
})
export class MemberTableComponent implements OnInit, AfterViewInit {
  @ViewChild('tableBody') tableBody: ElementRef;

  isPopupOpen: boolean = false;
  committees: Committee[] = [];
  activeCommittee: Committee;
  responseFilter: string = 'all-shortlist';
  selectedData: Company[] = [];
  expandedSuppliers: { [key: string]: boolean } = {};
  expandedCompanies: { [key: string]: boolean } = {};
  expandedCards: { [key: string]: { [key: string]: { [key: string]: boolean } } } = {};

  constructor(
    private router: Router,
    private committeeService: CommitteeService,
    private committeeConverter: CommitteeConverter
  ) { }

  ngOnInit() {
    this.loadCommittees();
  }

  ngAfterViewInit() {
    this.adjustSupplierColumnHeight();
  }

  loadCommittees() {
    this.committeeService.getCommittees().subscribe(
      (committees: Committee[]) => {
        // Pass the data through the converter
        this.committees = this.committeeConverter.convertCommittees(committees);
        if (this.committees.length > 0) {
          this.activeCommittee = this.committees[0];
          this.updateSelectedData();
          if (this.activeCommittee.members.length > 0 && this.activeCommittee.members[0].suppliers.length > 0) {
            this.activeCommittee.members[0].suppliers.forEach(supplier => {
              this.expandedSuppliers[supplier.name] = false;
            });
          }
        }
        this.adjustSupplierColumnHeight();
      },
      (error) => {
        console.error('Error loading committees:', error);
      }
    );
  }

  getResponses(company: Company, type: string): any[] {
    switch (type) {
      case 'committee':
        return company.members.committeeResponses || [];
      case 'nominee':
        return company.members.nomineeResponses || [];
      case 'shortlistCommittee':
        return company.members.shortlistCommitteeResponses || [];
      case 'shortlistNominee':
        return company.members.shortlistNomineeResponses || [];
      case 'preawardCommittee':
        return company.members.preawardCommitteeResponses || [];
      case 'preawardNominee':
        return company.members.preawardNomineeResponses || [];
      default:
        return [];
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  toggleCompanyAccordions(companyName: string, event: Event) {
    event.preventDefault(); // Prevent default behavior of details element
    this.expandedCompanies[companyName] = !this.expandedCompanies[companyName];
  }

  isCompanyExpanded(companyName: string): boolean {
    return this.expandedCompanies[companyName] || false;
  }

  onCommitteeChange(index: number) {
    this.activeCommittee = this.committees[index];
    this.updateSelectedData();
    this.adjustSupplierColumnHeight();
  }

  onResponseFilterChange(filter: string) {
    this.responseFilter = filter;
    this.updateSelectedData();
  }

  isCardExpanded(companyName: string, type: string, index: string): boolean {
    if (this.expandedCards[companyName] &&
      this.expandedCards[companyName][type] &&
      this.expandedCards[companyName][type][index]) {
      return this.expandedCards[companyName][type][index];
    }
    return false;
  }

  toggleCard(companyName: string, type: string, index: string): void {
    if (!this.expandedCards[companyName]) {
      this.expandedCards[companyName] = {};
    }
    if (!this.expandedCards[companyName][type]) {
      this.expandedCards[companyName][type] = {};
    }
    if (!this.expandedCards[companyName][type][index]) {
      this.expandedCards[companyName][type][index] = false;
    }
    this.expandedCards[companyName][type][index] = !this.expandedCards[companyName][type][index];
  }

  updateSelectedData() {
    switch (this.responseFilter) {
      case 'all-shortlist':
        this.selectedData = this.activeCommittee.responses.shortlist;
        break;
      case 'all-preaward':
        this.selectedData = this.activeCommittee.responses.preaward;
        break;
      case 'all-shortlist-preaward':
        this.selectedData = this.activeCommittee.responses.allShortlistPreaward;
        break;
    }
  }




  adjustSupplierColumnHeight() {
    setTimeout(() => {
      const rows = this.tableBody.nativeElement.querySelectorAll('tr');
      let currentMember = '';
      let memberHeight = 0;

      rows.forEach((row: HTMLElement) => {
        const memberNameCell = row.querySelector('td:first-child');
        if (memberNameCell) {
          const memberName = memberNameCell.textContent.trim();
          if (memberName !== currentMember) {
            // New member, update heights for previous member
            if (currentMember) {
              this.updateSupplierColumnHeight(currentMember, memberHeight);
            }
            currentMember = memberName;
            memberHeight = 0;
          }
        }
        memberHeight += row.offsetHeight;
      });

      // Update height for the last member
      if (currentMember) {
        this.updateSupplierColumnHeight(currentMember, memberHeight);
      }
    });
  }

  updateSupplierColumnHeight(memberName: string, height: number) {
    const supplierColumns = this.tableBody.nativeElement.querySelectorAll(`.supplier-column[data-member="${memberName}"]`);
    supplierColumns.forEach((column: HTMLElement) => {
      column.style.height = `${height}px`;
      const nameSpan = column.querySelector('.supplier-name') as HTMLElement;
      if (nameSpan) {
        nameSpan.style.height = `${height - 48}px`; // Subtract space for buttons
      }
    });
  }

  getTotalRows(member: any): number {
    return member.categories.reduce((sum: number, cat: any) => sum + cat.sections.length, 0);
  }

  toggleSupplier(supplierName: string, event: Event) {
    event.stopPropagation();
    this.expandedSuppliers[supplierName] = !this.expandedSuppliers[supplierName];
  }

  isSupplierExpanded(supplierName: string): boolean {
    return this.expandedSuppliers[supplierName] || false;
  }

  goToSupplierDetails(supplier: any, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/supplier', supplier.name]);
  }

  getCombinedIndex(categoryIndex: number, sectionIndex: number, member: any): number {
    let index = 0;
    for (let i = 0; i < categoryIndex; i++) {
      index += member.categories[i].sections.length;
    }
    return index + sectionIndex;
  }

  trackByMember(index: number, member: Member): string {
    return member.name;
  }

  trackByCategory(index: number, category: Category): string {
    return category.name;
  }

  trackBySection(index: number, section: Section): string {
    return section.name;
  }
}