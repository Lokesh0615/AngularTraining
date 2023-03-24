import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'javaScript';

  // arrays
  arr: any[] = ['lokesh', 12, 'hobbies', 'good',13, 23, 100, ]
  brr: any[] = ['mango', 'django', 'mongo']
  age:any[]=[12,34,12,34,23,43,53,63,12,45]
  data: any = ''

  // objects
  person={fname:'lokesh', lname:'N', age:22, eyeColor:'black'}


  ngOnInit(): void {
    let crr;
    // this.data=this.arr
    // console.log(this.arr);
    // concat()
    // let crr = this.arr.concat(this.brr, this.arr)
    // console.log(crr);

    // copyWithin()c
    // crr=this.arr.copyWithin(2,1,2)
    // console.log(crr);

    // entries()
    // for(let i of this.arr.entries()){
    //   console.log(i);
      
    // }

    // every() returns true if all elements are true
    // console.log(this.arr.every((data)=>{data>23}));

    // fill() ["abc" "cd"] o/p arr.fill('a')  =>  ['a', 'a']
    // console.log(this.arr.fill('a', 1,4));

    // filter()
    // console.log(this.age.filter((value)=>{
    //   return value<40
    // }));

    // find()
    // crr=this.age.find((data)=>{
    //   return data=12
    // })
    // console.log(crr);
    

    // findIndex()
    // console.log(this.age.findIndex((data)=>{ return data>34}));

    // froEach()
    // this.arr.forEach((data, index)=>{
    //   console.log(data, index);
      
    // })
    
    // includes()
    // console.log(this.arr.includes('Lokesh'));

    // indexOf()
    // console.log(this.arr.indexOf('hobbies'));

    // isArray()
    // console.log(Array.isArray(this.arr));

    // join()
    // crr=this.arr.join('a ')
    // console.log(crr);
    // console.log(typeof crr);
    
    // lastIndexOf()
    // console.log(this.age.lastIndexOf(12));
    // console.log(this.age.indexOf(12));

    // length 
    // console.log(this.arr.length);

    // map()
    // crr=this.age.map(Math.sqrt)
    // console.log(crr);
    
    // crr=this.age.map((data, index)=>{
    //   // console.log(data);
    //   // console.log(index);
    //   return data+ " "+index;
    // })
    // console.log(crr);
    
    // pop()
    // console.log(this.arr.pop());
    // console.log(this.arr);

    // push()
    // console.log(this.arr.push('good'));
    // console.log(this.arr);
    
    // ṛeverse()
    // console.log(this.arr.reverse());
    // console.log(this.arr);
    // this.arr.reverse()
    // console.log(this.arr);
    
    // shift()
    // console.log(this.arr.shift());
    // console.log(this.arr);
    // this.arr.push('lokesh')
    
    // slice()
    // crr=this.age.slice(4,-2)
    // crr=this.age.slice(4,7)
    // console.log(crr);

    // some()
    // console.log(this.age.some((data)=>{
    //   return data==12
    // }));

    // sort()
    // crr=this.arr.sort()
    // console.log(crr);
    
    // number array sort




    // spilce()
    // this.arr.splice(0, 0,"o", "k")
    // console.log(this.arr);
    // this.arr.splice(0,2)
    // console.log(this.arr);

    // toString()
    // crr=this.arr.toString()
    // console.log(crr);
    // crr= this.age.toString()
    // console.log(crr);
    
    // unshift()
    // this.arr.unshift("oo", "kk")
    // console.log(this.arr);


    // valueOf()
    // crr=this.arr.valueOf()
    // console.log(crr);
    



    
    "objects"
    // console.log(this.person.age);
    // console.log(this.person.fname + this.person.lname);
    // console.log(this.person['age']);
    
    // for in loop
    // for(let variable in this.person){
    //   console.log(variable);
    //   // text+=this.person.
      
    // }
    
    

   


    
 
  
    
    
  }
}

