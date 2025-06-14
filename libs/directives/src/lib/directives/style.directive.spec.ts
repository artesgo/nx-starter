import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleDirective } from './style.directive';

describe('StyleDirective', () => {
  // TODO: how test directive
  let directive: StyleDirective;
  let fixture: ComponentFixture<StyleDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(StyleDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
