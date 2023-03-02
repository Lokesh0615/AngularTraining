import { Component } from '@angular/core';
import { Recipe} from './recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
recipes:Recipe[]=[
  new Recipe("biriyani", "this is a good recipe whoisch is available at low price","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyR--wKqj4NA6B7l2FW_YWVDh2rQI7AAzayw&usqp=CAU"),
  new Recipe("biriyani", "this is a good recipe whoisch is available at low price","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyR--wKqj4NA6B7l2FW_YWVDh2rQI7AAzayw&usqp=CAU"),
  new Recipe("biriyani", "this is a good recipe whoisch is available at low price","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyR--wKqj4NA6B7l2FW_YWVDh2rQI7AAzayw&usqp=CAU")

]

}
