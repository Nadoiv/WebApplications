import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-by-graph',
  templateUrl: './group-by-graph.component.html',
  styleUrls: ['./group-by-graph.component.css']
})
export class GroupByGraphComponent implements OnInit {

  @Input() groupObsv: Observable<any>
  @Input() group: any;
  width: number = 850;
  height: number = 550;
  barWidth: number = 30;
  margin: any;
  svg: any;
  xScale: any;
  yScale: any;
  yTicks: any;
  xAxis: any;
  yAxis: any;
  max: any;
  min: any;

  constructor() {
    this.margin = {
      top: 35,
      right: 60,
      bottom: 40,
      left: 80
    }

    this.width = this.width - this.margin.left - this.margin.right
    this.height = this.height - this.margin.top - this.margin.bottom
  }

  ngOnInit() {
    this.groupObsv.subscribe(group => {
      this.group = group;
      this.setup();
      this.clearSvg();
      this.buildSvg();
      this.buildXAxis();
      this.buildYAxis();
      this.populate();
    })

    this.setup();
    this.clearSvg();
    this.buildSvg();
    this.buildXAxis();
    this.buildYAxis();
    this.populate();

  }

  setup() {
    this.max = d3.max(this.group.data, (d: any) => d.count);
    this.min = d3.min(this.group.data, (d: any) => d.count);

    this.xScale = d3.scaleBand().range([0, this.width]).domain(this.group.data.map(d => d._id))
    this.yScale = d3.scaleLinear().range([0, this.height]).domain([0, this.max])
    this.yTicks = d3.scaleLinear().range([this.height, 0]).domain([0, this.max])
  }

  clearSvg() {
    d3.select('.group-by-chart').selectAll('g').remove()
  }

  buildSvg() {
    this.svg = d3.select('.group-by-chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .style('color', 'white')
      .style('background-color', 'rgb(96,125,139)')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
  }

  buildXAxis() {
    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(this.group.data.length)
      .tickPadding(10)

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .style('font-size', '0.7em')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .call(this.xAxis)
      .append('text')
      .attr('x', this.width + 10)
      .attr('y', -10)
      .style('fill', 'white')
      .style('font-size', '1.3em')
      .text(() => {
        return this.group.map || this.group.field
      })

  }

  buildYAxis() {
    this.yAxis = d3.axisLeft(this.yTicks)
      .ticks(5)
      .tickPadding(15)

    this.svg.append('g')
      .style('font-size', '1em')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .call(this.yAxis)
      .append('text')
      .attr('x', this.margin.left - 20)
      .attr('y', -10)
      .style('fill', 'white')
      .text(() => {
        return this.group.reduce || 'Renting'
      })

  }

  populate() {
    this.svg.selectAll('rect')
      .data(this.group.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (this.width / this.group.data.length) + (this.width / this.group.data.length) / 2 - this.barWidth / 2)
      .attr('y', d => this.height - this.yScale(d.count))
      .attr('width', this.barWidth)
      .attr('height', d => this.yScale(d.count))
      .attr('fill', d => {
        switch (d.count) {
          case this.max: {
            return 'rgba(183,255,183,1)'
          }
            break;
          case this.min: {
            return 'rgba(255,183,183,1)'
          }
            break;
          default: {
            return 'rgba(255,255,255,1)'
          }
        }
      })

    this.svg.append('g')
      .selectAll('text')
      .data(this.group.data)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * (this.width / this.group.data.length) + (this.width / this.group.data.length) / 2 - this.barWidth / 2 + 10)
      .attr('y', d => this.height - this.yScale(d.count) + 20)
      .style('fill', 'rgba(0,0,0,0.6)')
      .text(d => d.count.toFixed(0))

  }

}
