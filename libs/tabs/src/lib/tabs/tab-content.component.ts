import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'atg-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
  standalone: true,
})
export class TabContentComponent {
  type = input<'bordered' | 'boxed' | 'lifted'>('lifted');
  hatched = input<boolean>(false);

  @HostBinding('class.max-w-full') fullWidth = true;
  @HostBinding('class.tab-content') tabContent = true;
  @HostBinding('class.tabs-lifted') get isLifted() {
    return this.type() === 'lifted';
  }
  @HostBinding('class.tabs-boxed') get isBoxed() {
    return this.type() === 'boxed';
  }
  @HostBinding('class.tabs-bordered') get isBordered() {
    return this.type() === 'bordered';
  }
}
