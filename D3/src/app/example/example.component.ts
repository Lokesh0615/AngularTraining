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
    { name: 'nag', score: 94 },
    { name: 'nagendra', score: 74 },
    { name: 'anay', score: 27 },
    { name: 'prajval', score: 84 },
    { name: 'okay', score: 46 },
  ]

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  ngOnInit(): void {
    this.createColors();

    this.createSvg();
    // this.createSvg();
    this.drawPieChart()
  }

  createSvg() {
    this.svg = d3.select('div#grap')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', "translate(" + this.width / 2 + "," + this.height / 2 + ")")
  }

  createColors() {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.name))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782", "#879cc6", "#677747", "#5a6728"])
  }

  drawPieChart() {
    const pie = d3.pie<any>().value((d => d.score))

    this.svg.selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius)

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
