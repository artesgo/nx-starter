import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[atgLink]',
  standalone: true,
})
export class LinkDirective {
  id = input.required<string>();
  href = input.required<string>();
  hover = input(false);
  atgLink = input<'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'error' | 'warning' | 'info'>('primary');

  @HostBinding('class.link-primary') get primary() {
    return this.atgLink() === 'primary';
  }
  @HostBinding('class.link-secondary') get secondary() {
    return this.atgLink() === 'secondary';
  }
  @HostBinding('class.link-accent') get accent() {
    return this.atgLink() === 'accent';
  }
  @HostBinding('class.link-success') get success() {
    return this.atgLink() === 'success';
  }
  @HostBinding('class.link-info') get info() {
    return this.atgLink() === 'info';
  }
  @HostBinding('class.link-warning') get warning() {
    return this.atgLink() === 'warning';
  }
  @HostBinding('class.link-neutral') get neutral() {
    return this.atgLink() === 'neutral';
  }
  @HostBinding('class.link-error') get error() {
    return this.atgLink() === 'error';
  }
  @HostBinding('class.link-hover') get hvr() {
    return this.hover();
  }
}
