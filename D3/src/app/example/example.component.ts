import { OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  data = [
    { name: 'Lokesh', score: 45 },
    { name: 'loki', score: 48 },
    { name: 'jai', score: 92 },
    { name: 'nag', score: 94},
    { name: 'nagendra', score: 74 },
    { name: 'anay', score: 27 },
    { name: 'prajval', score: 84 },
    { name: 'okay', score: 46 },
  ]

  ngOnInit(): void {
    this.createChart();
    if(this.data){
      this.updateChart()
    }
    
  }

  @ViewChild('garp') garp: ElementRef;

  margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  width=800;
  height=400;
  chart: any;
  // data
 
  xScale!: any;
  yScale !: any;
  colors!: any;
  xAxis!: any;
  yAxis!: any;

  svg=d3.select('garp').append('svg')
  .attr('height')
  // .attr('width')

  createChart(){
    let element=this.garp.nativeElement;
    this.width=element.offsetWidth - this.margin.left - this.margin.right;
    this.height=element.offsetHeight - this.margin.top - this.margin.bottom;

    let svg =d3.select(element).append('svg')
          .attr('width', element.offsetWidth)
          .attr('height', element.offsetHeight);
    
          // chartplot area
          this.chart=svg.append('g')
          .attr('class', 'bars')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

          // define x and y domains
          let xDomain = this.data.map(d=>d[0]);
          let yDomain= [0, d3.max(this.data, d=>d[1])]

          // create scales
          this.xScale=d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width])
          this.yScale=d3.scaleBand().domain(yDomain).range([this.height, 0])

          // bar colors
          this.colors=d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue'])

          // x and y axis
          this.xAxis=svg.append('g')
          .attr('calss', 'axis axis-x')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
          .call(d3.axisLeft(this.yScale))

  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }
}
