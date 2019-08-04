import React from 'react';
import * as d3 from 'd3';
import STORE from './STORE';
import './DataMap.css';

class DataMap extends React.Component {
  state = {
    view: 'Views'
  };

  render() {
    let margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    let svg = d3
      .select('.dataChart')
      .append('svg')
      .attr('viewBox', '0 0 1000 500')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let x = d3
      .scaleBand()
      .range([0, width])
      .padding(1);

    let xAxis = svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')');

    let y = d3.scaleLinear().range([height, 0]);

    let yAxis = svg.append('g').attr('class', 'myYaxis');

    function update(selectedView) {
      x.domain(STORE.Posts.map(d => d.name));
      xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-25)')
        .style('text-anchor', 'end');

      y.domain([0, d3.max(STORE.Posts, d => d[selectedView])]);
      yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

      let j = svg.selectAll('.myLine').data(STORE.Posts);

      j.enter()
        .append('line')
        .attr('class', 'myLine')
        .merge(j)
        .transition()
        .duration(1000)
        .attr('x1', d => x(d.name))
        .attr('x2', d => x(d.name))
        .attr('y1', y(0))
        .attr('y2', d => y(d[selectedView]))
        .attr('stroke', 'grey');

      let u = svg.selectAll('.myData').data(STORE.Posts);

      u.enter()
        .append('text')
        .attr('class', 'myData')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('x', d => x(d.name) - 10)
        .attr('y', d => y(d[selectedView]) - 10)
        .style('font-size', '13px')
        .text(d =>
          selectedView === 'views'
            ? d[selectedView].toLocaleString('en')
            : `$${d[selectedView]}`
        );

      let i = svg.selectAll('.myCircle').data(STORE.Posts);

      i.enter()
        .append('circle')
        .attr('class', 'myCircle')
        .merge(i)
        .transition()
        .duration(1000)
        .attr('cx', d => x(d.name))
        .attr('cy', d => y(d[selectedView]))
        .attr('r', 4)
        .attr('fill', '#A08F7B');
    }

    update('views');

    return (
      <div className="data-section-wrap">
        <div className="sales-hdr">
          <span>Analytics</span>

          <button
            type="button"
            className="viewSelector"
            onClick={() => update('sales')}
          >
            Sales
          </button>
          <button
            type="button"
            className="viewSelector"
            onClick={() => update('commissions')}
          >
            Commissions
          </button>
          <button
            type="button"
            className="viewSelector"
            onClick={() => update('views')}
            autoFocus
          >
            Views
          </button>
        </div>

        <section className="dataChart" />
      </div>
    );
  }
}

export default DataMap;
