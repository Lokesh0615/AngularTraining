import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { VariableService } from '../services/variable.service';
import * as d3 from 'd3';
import { APIService } from '../services/APIservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // for graph option dropdown
  graphDropdown = [{ axis: "Horizontal" }, { axis: "Vertical" }]

  //  to bind the graph dropdown value
  graphDropdownValue;

  // width of the grap
  dynamicWidthOfGraph;

  // for chart 
  attendanceData;

  // for grap
  svg: any;
  margin = 50;
  width = 750 - (this.margin * 2);
  height = 400 - (this.margin * 2);

  // to give width to the graph
  @ViewChild('graph') graph: any;

  constructor(private apiService: APIService, private renderer: Renderer2) { }

  ngOnInit() {
    let storage = localStorage;
    storage.setItem('icons', JSON.stringify({ 'title': 'Home', 'icon': 'pi pi-home' }));
    storage.setItem('path', 'Home');

    this.apiService.fetchAllAttendanceDetails().subscribe((results) => {
      this.attendanceData = results;
      this.dynamicWidthOfGraph = this.attendanceData.length * 150;
      this.createSvg();
      this.horizontalBarChart();
    });

  }

  // to create svg 
  createSvg() {
    this.svg = d3.select('#svg')
      .append('g')
      .attr('class', 'removeGraph')
      .attr("transform", "translate(" + (this.margin + 20) + ", 10)");

    this.renderer.setStyle(this.graph.nativeElement, "width", this.dynamicWidthOfGraph);
  }

  //  to change the graph horizontal to vertical and vertical to horizontal
  onChange(event: any) {
    if (event.value == 'Vertical') {
      // removing g which have class removeGraph
      d3.selectAll('.removeGraph').remove();
      this.verticalBarChart();
    } else {
      d3.selectAll('.removeGraph').remove();
      this.horizontalBarChart();
    }
  }


  verticalBarChart() {
    // Create the X-axis band scale
    this.createSvg();
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.attendanceData.map(d => d.studentId))
      .padding(0.1);

    // Draw the X-axis 
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .style("text-anchor", "center");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(this.attendanceData, function (d) { return d.attendanceCount })])
      .range([this.height, 0]);

    // Draw the Y-axis 
    this.svg.append("g")
      .call(d3.axisLeft(y))
      .style("text-anchor", "center");

    // Add X axis label:
    this.svg.attr('width', this.dynamicWidthOfGraph)
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width / 2)
      .attr("y", this.height + this.margin)
      .text("Student Id")
      .style('font-weight', 'bold');

    // Y axis label:
    this.svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin + 15)
      .attr("x", -this.margin)
      .text("Attendance Count")
      .style('font-weight', 'bold');

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(this.attendanceData)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.studentId))
      .attr("y", (d: any) => y(d.attendanceCount))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.attendanceCount))
      .attr("fill", "#d04a35");

  }

  horizontalBarChart() {
    this.createSvg();
    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, d3.max(this.attendanceData, function (d) { return d.attendanceCount })])
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
      .range([0, this.height])
      .domain(this.attendanceData.map((d) => d.studentId))
      .padding(.1);

    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Add X axis label like student id
    this.svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width / 2)
      .attr("y", this.height + this.margin)
      .text("Attendance Count")
      .style('font-weight', 'bold');

    // Y axis label
    this.svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin)
      .attr("x", -this.margin)
      .text("Student Id")
      .style('font-weight', 'bold');

    //Bars
    this.svg.selectAll("myRect")
      .data(this.attendanceData)
      .enter()
      .append("rect")
      .attr("y", function (d) { return y(d.studentId) })
      .attr("width", function (d) { return x(d.attendanceCount) })
      .attr("height", y.bandwidth())
      .attr("fill", "#d04a35");

  }
}
