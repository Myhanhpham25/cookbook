import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(recipes: Array<any>, search_text: string): Array<any> {

     if(!search_text){ return recipes } 

  	search_text = search_text.toLowerCase() 

    return recipes.filter(recipe => recipe.title.toLowerCase().includes(search_text))
 }

}




