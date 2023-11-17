import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoAssistenciaisPage } from './info-assistenciais.page';

describe('InfoAssistenciaisPage', () => {
  let component: InfoAssistenciaisPage;
  let fixture: ComponentFixture<InfoAssistenciaisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoAssistenciaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
