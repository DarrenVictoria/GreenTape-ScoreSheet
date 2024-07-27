import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRowComponent } from './member-row.component';

describe('MemberRowComponent', () => {
  let component: MemberRowComponent;
  let fixture: ComponentFixture<MemberRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
