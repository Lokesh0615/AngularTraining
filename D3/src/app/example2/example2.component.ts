import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})

export class Example2Component implements OnInit {

  @ViewChild('ss') ss:any;

  ngOnInit(): void {
    this.buildSvg();

  }

  public title = 'Line Chart';
  public data: any[] = [
    { date: new Date('2010-01-01'), value: 40 },
    { date: new Date('2010-01-04'), value: 93 },
    { date: new Date('2010-01-05'), value: 95 },
    { date: new Date('2010-01-06'), value: 130 },
    { date: new Date('2010-01-07'), value: 110 },
    { date: new Date('2010-01-08'), value: 120 },
    { date: new Date('2010-01-09'), value: 129 },
    { date: new Date('2010-01-10'), value: 107 },
    { date: new Date('2010-01-11'), value: 140 },
  ];


  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination

  constructor() {
    // configure margins and width/height of the graph
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  private buildSvg() {
    this.svg=d3.select('svg')
    .append('g')
    .attr('transform', 'translate('+this.margin.left+','+this.margin.top+')')


    // this.svg = d3.select('svg') // svg element from html
    //   .append('g')   // appends 'g' element for graph design
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    // console.log('build');

    this.addXandYAxis();
  }


  private addXandYAxis() {
    // range of data configuring
    this.x=d3Scale.scaleTime().range([0, this.width]);
    this.y=d3Scale.scaleTime().range([ this.height,0])
    this.x.domain(d3Array.extent(this.data, (d)=> d.value))
    this.y.domain(d3Array.extent(this.data, (d)=> d.date))
    this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height+')')
    .call(d3Axis.axisBottom(this.x))

    this.svg.append('g')
    // .attr('class', 'axis axis--y')
    .call(d3Axis.axisLeft(this.y))
    // this.x = d3Scale.scaleTime().range([0, this.width]);
    // this.y = d3Scale.scaleLinear().range([this.height, 0]);
    // this.x.domain(d3Array.extent(this.data, (d) => d.date));
    // this.y.domain(d3Array.extent(this.data, (d) => d.value));
    // // Configure the X Axis
    // this.svg.append('g')
    //   .attr('transform', 'translate(0,' + this.height + ')')
    //   .call(d3Axis.axisBottom(this.x));
    // // Configure the Y Axis
    // this.svg.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(d3Axis.axisLeft(this.y));

    this.drawLineAndPath();

  }


  private drawLineAndPath() {
    this.line=d3Shape.line()
    .x((d:any) => this.x(d.value))
    .y((d:any)=> this.y(d.date))

    this.svg.append('path')
    .datum(this.data)
    .attr('d', this.line)

    // this.line = d3Shape.line()
    //   .x((d: any) => this.x(d.date))
    //   .y((d: any) => this.y(d.value));
    // // Configuring line path
    // this.svg.append('path')
    //   .datum(this.data)
    //   .attr('class', 'line')
    //   .attr('d', this.line);

    console.log('draw');

  }


}
