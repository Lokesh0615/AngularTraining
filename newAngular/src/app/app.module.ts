import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LifeCycleHooksComponent } from './life-cycle-hooks/life-cycle-hooks.component';
import { ContentChildComponent } from './content-child/content-child.component';
import { SetBackgroundDirective} from './customDirective/setBackground.directive'
import { SetBorderDirective} from './customDirective/setBorder.directive'
import { setBorderRadiusDirective} from './customDirective/setBorderRadius.directive';
import { HighLightDirective } from './customDirective/high-light.directive'
 
@NgModule({
  declarations: [
    AppComponent,
    LifeCycleHooksComponent,
    ContentChildComponent,
    SetBackgroundDirective,
    SetBorderDirective,
    setBorderRadiusDirective,
    HighLightDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
