import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.css']
})
export class Example4Component implements OnInit {
  dataSet = [1, 2, 3, 4, 35]
  // for bar Cahrt
  dataset2 = [59, 20, 50, 69, 58, 79, 49]
  width = 500
  height = 300
  padding = 5;
  barWidth = (this.width / this.dataset2.length)

  ngOnInit(): void {
    // d3.select('h1')
    // .text('d3.js heading')
    // .style('color', 'green')
    // .attr('class', 'example4')
    // .append('p')
    // .text('p paragrap')

    // d3.select('div')
    // // .sele``
    // .data(this.dataSet)
    // // enter() is use to loop over a array
    // .enter()
    // .append('p')
    // // .text('d3 is a')
    // // to return the text inside the array
    // .text((d)=>d)


    // simple barchart
    let ss = d3.select('svg')
    // let svg = ss
      // .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')

let barchart=ss.selectAll('rect')
      .data(this.dataset2)
      .enter()
      .append('rect')
      .attr('class',"rect")
      .attr('stroke', "red")
      .attr('y', (d) => this.height - d)
      .style('border',"1px solid red")
      .attr('height', (d) => d)
      .attr('width', this.barWidth - this.padding)
      .attr('transform', (d, i) => {
        let translate = [this.width + i, 0]
        return "translate(" + translate + ")"
      })
      // .style('border', 'solid 2px black')

  }



}
