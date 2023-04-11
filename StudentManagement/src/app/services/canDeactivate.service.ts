import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


export interface DeactivateComponent{
    exit: ()=> boolean |Observable<boolean>|Promise<boolean>;
}

export class CanDeactivateService implements CanDeactivate<DeactivateComponent>{
    canDeactivate(component:DeactivateComponent)
    {
        return component.exit();
    }

   
}