import { EventEmitter } from "@angular/core"
export class UserService1{
    users=[
        {name:"john", job:"teacher", gender:"male", country:'india' , age:34, avatr:'assets/maleAvatar.jpg'},
        {name:"lokesh", job:"desinger", gender:"male", country:'india' , age:22, avatr:'assets/maleAvatar.jpg'},
        {name:"maam", job:"teacher", gender:"female", country:'india' , age:34, avatr:'assets/femaleAvatar.jpg'},
        {name:"femalee", job:"QA", gender:"female", country:'india' , age:45, avatr:'assets/femaleAvatar.jpg'},

    ]
    onShowDetailesClicked=new EventEmitter<{name:string, job:string, gender:string, country:string , age:number, avatr:string}>();

    ShowUserDetailes(user:{name:string, job:string, gender:string, country:string , age:number, avatr:string}){
        this.onShowDetailesClicked.emit(user);
    }
}