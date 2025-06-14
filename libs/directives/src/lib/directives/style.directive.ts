import { Directive, HostBinding, input } from '@angular/core';

export type DaisyStyles = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'ghost' | '';

@Directive({
  selector: '[atgStyle]',
  standalone: true,
})
export class StyleDirective {
  // this directive adds background color and foreground text color
  atgStyle = input<DaisyStyles>('');
  @HostBinding('class.bg-accent') get bgAccent() {
    return this.atgStyle() === 'accent';
  }
  @HostBinding('class.bg-neutral') get bgNeutral() {
    return this.atgStyle() === 'neutral';
  }
  @HostBinding('class.bg-primary') get bgPrimary() {
    return this.atgStyle() === 'primary';
  }
  @HostBinding('class.bg-secondary') get bgSecondary() {
    return this.atgStyle() === 'secondary';
  }
  @HostBinding('class.text-accent-content') get textAccent() {
    return this.atgStyle() === 'accent';
  }
  @HostBinding('class.text-neutral-content') get textNeutral() {
    return this.atgStyle() === 'neutral';
  }
  @HostBinding('class.text-primary-content') get textPrimary() {
    return this.atgStyle() === 'primary';
  }
  @HostBinding('class.text-secondary-content') get textSecondary() {
    return this.atgStyle() === 'secondary';
  }
}
