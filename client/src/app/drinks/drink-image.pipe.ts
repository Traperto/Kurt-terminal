import { Pipe, PipeTransform } from '@angular/core';
import { Drink } from './drink.model';

@Pipe({
    name: 'drinkImage',
})
export class DrinkImagePipe implements PipeTransform {
    transform(drink: Drink): string {
        return `assets/images/drinks/${drink.name
            .toLocaleLowerCase()
            .trim()
            .replace(/ /g, '-')}.svg`;
    }
}
