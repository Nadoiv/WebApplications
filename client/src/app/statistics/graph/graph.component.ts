import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Statistics } from 'src/app/core/models/statistics.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() statisticsData: Statistics
  width: number = 750;
  height: number = 300;
  barHeight: number = 35;
  barMargin: number = 2;
  margin: any;
  svg: any;
  xScale: any;
  max: any;
  min: any;

  constructor() {
    this.margin = {
      top: 65,
      right: 15,
      bottom: 15,
      left: 85
    }

    this.width = this.width - this.margin.left - this.margin.right
    this.height = this.height - this.margin.top - this.margin.bottom
  }

  ngOnInit() {
    this.setup();
    this.buildSvg();
    this.buildTemplate();
    this.populate();
    this.addText();

  }

  setup() {
    this.xScale = d3.scaleLinear().range([0, this.width]).domain([0, this.statisticsData.hitCount])
    this.max = d3.max(this.statisticsData.lastClient, d => d.frequency)
    this.min = d3.min(this.statisticsData.lastClient, d => d.frequency)
  }

  buildSvg() {
    this.svg = d3.select(".chart")
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .style('background-color', 'rgb(96,125,139)')
      .append('g')
      .attr('transform', d => `translate(${this.margin.left}, ${this.margin.top})`)
  }

  buildTemplate() {
    this.svg
      .selectAll('rect')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d => 0)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.width)
      .attr('height', this.barHeight)
      .attr('fill', d => {
        if (d.frequency === this.max) {
          return 'rgba(0,255,0,0.5)'
        } else if (d.frequency === this.min) {
          return 'rgba(255,0,0,0.5)'
        } else {
          return ('rgba(255,255,255,0.5)')
        }
      })

    d3.select(".chart")
      .append('text')
      .attr('x', (this.width + this.margin.left + this.margin.right - 203) / 2)
      .attr('y', 50)
      .text("User's Statistics")
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-size', '2em')

    d3.select(".chart")
      .append('text')
      .attr('x', 10)
      .attr('y', this.height + this.margin.top)
      .text("*Data is according to the last user visited the site")
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-size', '0.75em')

  }

  populate() {
    this.svg.selectAll('g')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d =>0)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.xScale(d.frequency))
      .attr('height', this.barHeight)
      .attr('fill', 'rgba(0,0,0,0.2)')
  }

  addText() {
    this.svg.selectAll('g')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => 3)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin)+15)
      .text(d => d.value)
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-size','0.8em')
      .exit()
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => this.xScale(d.frequency) - 30)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin) + this.barHeight - 5)
      .text(d => (d.frequency * 100 / this.statisticsData.hitCount).toFixed(1) + '%')
      .attr('fill', 'white')
      .style('font-size','0.8em')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .exit()
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => -this.margin.left + 5)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin) + 22)
      .text(d => d.field)
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-weight', "bold")
  }


}
