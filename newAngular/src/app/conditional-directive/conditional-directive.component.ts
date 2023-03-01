import { ViewEncapsulation } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-conditional-directive',
  templateUrl: './conditional-directive.component.html',
  styleUrls: ['./conditional-directive.component.css']
})
export class ConditionalDirectiveComponent {
tittle="DirectiveExample";
videos=[

  {tittle:"my video1", share:234,likes:345, dislikes:234 },
  {tittle:"my video2", share:232,likes:324, dislikes:246 },
  {tittle:"my video3", share:236,likes:533, dislikes:236 },
  {tittle:"my video4", share:247,likes:344, dislikes:234 }
]
mostLikesdVideo=this.getMostLikedVideo();
getMostLikedVideo(){
  let videoCopy=[...this.videos];

  let a = videoCopy.sort((cuur, next)=>next.likes - cuur.likes);
  console.log(a[0]);
  
  return a[0];
}
}
