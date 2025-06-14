import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkDirective } from './link.directive';

describe('LinkDirective', () => {
  let component: LinkDirective;
  let fixture: ComponentFixture<LinkDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
