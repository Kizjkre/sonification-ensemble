<script>
  import d from '$lib/stores/data.js';
  import s from '$lib/stores/selected.js';
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  let svg;
  let height = 400;
  let width = 600;

  let bandwidth = 0;
  let padding = 0;
  let pos = 0;

  $: if ($s in $d) {
    const data = $d[$s].data.map(d1 => d1[$d[$s].data.columns[$d[$s].data.y]]);
    const color = $d[$s].data.map(d1 => d1[$d[$s].data.columns[$d[$s].data.color]]);

    d3.select(svg)
      .attr('width', width)
      .attr('height', height);

    const xpad = 0.1;
    const ypad = 0.01;

    const x = d3.scaleBand()
      .domain($d[$s].data.map((_, i) => i))
      .range([0, width])
      .padding(xpad);

    const y = d3.scaleBand()
      .domain([...new Set(data)].sort())
      .range([height, 0])
      .padding(ypad);

    bandwidth = x.bandwidth() / (1 - xpad);
    padding = xpad * bandwidth;

    d3.select('g#data')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (_, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', (_, i) => d3.schemeCategory10[color[i]]);

    d3.select('rect#seeker')
      .attr('height', height)
      .attr('width', padding);
  }

  onMount(() => {
    const rect = svg.parentElement.getBoundingClientRect();

    height = rect.height;
    width = rect.width;

    d3.select(svg)
      .selectAll('g#data')
      .data([null])
      .join('g')
      .attr('id', 'data');

    d3.select(svg)
      .selectAll('rect#seeker')
      .data([null])
      .join('rect')
      .attr('id', 'seeker')
      .attr('x', pos * bandwidth)
      .attr('y', 0)
      .attr('width', padding)
      .attr('height', height)
      .attr('fill', 'red');
  });

  const handleKeyDown = e => {
    switch (e.key) {
      case ' ':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', ++pos * bandwidth);
        break;
      case 'Backspace':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', --pos * bandwidth);
        break;
      case 'Enter':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', 0);
        pos = 0;
        break;
    }
  };

  const handleResize = () => {
    const rect = svg.parentElement.getBoundingClientRect();

    height = rect.height;
    width = rect.width;
  };
</script>

<svelte:document on:keydown={ handleKeyDown } />
<svelte:window on:resize={ handleResize } />

<svg bind:this={ svg } class="absolute top-0"></svg>
