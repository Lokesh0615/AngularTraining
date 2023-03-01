import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LifeCycleHooksComponent } from './life-cycle-hooks/life-cycle-hooks.component';
import { ContentChildComponent } from './content-child/content-child.component';
import { SetBackgroundDirective} from './customDirective/setBackground.directive'
import { SetBorderDirective} from './customDirective/setBorder.directive'
import { setBorderRadiusDirective} from './customDirective/setBorderRadius.directive';
import { Renderer2Component } from './renderer2/renderer2.component'
import { Rednderer2Directive} from './renderer2/renderer2.directive'
import { CreateTextDirective} from './customDirective/createText.directive';
import { HostComponent } from './host/host.component' 
import { HostDirective } from './host/host.directive'
import { HostBindingDirective } from "./host/hostBinding.directive"
import { BindingDircetive } from './host/bindininDircetiveProperty.directive';
import { ClassDDirective } from './customDirective/class-d.directive';
import { RendererListenDirective } from './renderer2/renderer-listen.directive';
import { ConditionalDirectiveComponent } from './conditional-directive/conditional-directive.component'
import { HighLightDirective } from './conditional-directive/high-light.directive';
import { IfDirective } from './conditional-directive/If.directive'

@NgModule({
  declarations: [
    AppComponent,
    LifeCycleHooksComponent,
    ContentChildComponent,
    SetBackgroundDirective,
    SetBorderDirective,
    setBorderRadiusDirective,
    HighLightDirective,
    Renderer2Component,
    Rednderer2Directive,
    CreateTextDirective,
    HostComponent,
    HostDirective,
    HostBindingDirective,
    BindingDircetive,
    ClassDDirective,
    RendererListenDirective,
    ConditionalDirectiveComponent,
    HighLightDirective,
    IfDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
