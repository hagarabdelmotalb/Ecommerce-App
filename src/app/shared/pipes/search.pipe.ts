import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject: any[], searchText: string): any[] {
    if (!searchText) return arrayOfObject;

    searchText = searchText.toLowerCase();

    return arrayOfObject.filter((product) =>
      product.title.toLowerCase().includes(searchText)
    );
  }

}
