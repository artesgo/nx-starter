import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, input, model, TemplateRef } from '@angular/core';

@Component({
  selector: 'atg-tabs',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  tabs = input.required<
    {
      name: string;
      tab: TemplateRef<string> | undefined;
    }[]
  >();
  selected = model<string>();
  type = input<'bordered' | 'boxed' | 'lifted'>('bordered');
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('neutral');
  size = input<'sm' | 'md' | 'lg' | 'xs'>('md');

  @HostBinding('class.w-full') fullWidth = true;
}
