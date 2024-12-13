import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarmePage } from './registro.page';

describe('RegistroPage', () => {
  let component: RegistrarmePage;
  let fixture: ComponentFixture<RegistrarmePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
