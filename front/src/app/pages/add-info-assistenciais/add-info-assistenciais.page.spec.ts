import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddInfoAssistenciaisPage } from './add-info-assistenciais.page';

describe('AddInfoAssistenciaisPage', () => {
  let component: AddInfoAssistenciaisPage;
  let fixture: ComponentFixture<AddInfoAssistenciaisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddInfoAssistenciaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
