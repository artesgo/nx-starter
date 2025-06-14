import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[atgButton]',
  standalone: true,
})
export class ButtonDirective {
  atgButton = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  @HostBinding('class.btn') get btn() {
    return true;
  }
  @HostBinding('class.btn-accent') get accent() {
    return this.atgButton() === 'accent';
  }
  @HostBinding('class.btn-ghost') get ghost() {
    return this.atgButton() === 'ghost';
  }
  @HostBinding('class.btn-info') get info() {
    return this.atgButton() === 'info';
  }
  @HostBinding('class.btn-neutral') get neutral() {
    return this.atgButton() === 'neutral';
  }
  @HostBinding('class.btn-primary') get primary() {
    return this.atgButton() === 'primary';
  }
  @HostBinding('class.btn-secondary') get secondary() {
    return this.atgButton() === 'secondary';
  }
  @HostBinding('class.btn-xs') get xs() {
    return this.size() === 'xs';
  }
  @HostBinding('class.btn-sm') get sm() {
    return this.size() === 'sm';
  }
  @HostBinding('class.btn-md') get md() {
    return this.size() === 'md';
  }
  @HostBinding('class.btn-lg') get lg() {
    return this.size() === 'lg';
  }
}
