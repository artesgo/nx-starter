import { Component } from '@angular/core';

@Component({
  selector: 'bgt-flex-pair',
  template: `
    <div class="flex flex-row gap-6 justify-between items-center md:w-5/6 lg:w-1/2 mx-auto mb-8">
      <ng-content></ng-content>
    </div>
  `,
})
export class FlexPair {}
