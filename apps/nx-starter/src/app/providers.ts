import { environment } from '../environments/env';

export function provideMarvelConfig() {
  return {
    provide: 'MARVEL_CONFIG',
    useValue: environment.marvel,
  };
}
