import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tfsa } from './tfsa';

describe('Tfsa', () => {
  let component: Tfsa;
  let fixture: ComponentFixture<Tfsa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tfsa],
    }).compileComponents();

    fixture = TestBed.createComponent(Tfsa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
