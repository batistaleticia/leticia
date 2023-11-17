import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComentarioPage } from './add-comentario.page';

describe('AddComentarioPage', () => {
  let component: AddComentarioPage;
  let fixture: ComponentFixture<AddComentarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
