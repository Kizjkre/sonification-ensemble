<script>
  import d from '$lib/stores/data.js';
  import s from '$lib/stores/selected.js';
  import measure from '$lib/stores/measure.js';
  import state, { STATE } from '$lib/stores/state.js';
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  let div;

  let svg;
  let height = 400;
  let width = 600;

  let bandwidth = 0;
  let padding = 0;

  let pi = NaN;

  $: if ($s in $d) {
    const index = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].index]]);
    const data = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].y]]);
    const color = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].color]]);

    d3.select(svg)
      .attr('width', width)
      .attr('height', height);

    const xdomain = $d[$s].index !== -1 ? [...new Set(index)] : $d[$s].data.map((_, i) => i);

    const xpad = 0.1 / 50 * xdomain.length;
    const ypad = 0.01;

    const x = d3.scaleBand()
      .domain(xdomain)
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
      .attr('x', (_, i) => x($d[$s].index === -1 ? i : index[i]))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', (_, i) => d3.schemeCategory10[color[i]]);

    d3.select('rect#seeker')
      .attr('height', height)
      .attr('width', padding);

    if ($d[$s].index !== pi) {
      d3.select('rect#seeker')
        .attr('x', $measure * bandwidth);
      pi = $d[$s].index;
    }
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
      .attr('x', $measure * bandwidth)
      .attr('y', 0)
      .attr('width', padding)
      .attr('height', height)
      .attr('fill', 'red');

    const observer = new ResizeObserver(handleResize);
    observer.observe(div);
  });

  const handleKeyDown = e => {
    switch (e.key) {
      case ' ':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', ++$measure * bandwidth);
        break;
      case 'Backspace':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', --$measure * bandwidth);
        break;
      case 'Enter':
        d3.select('rect#seeker')
          .transition(10)
          .attr('x', 0);
        $measure = 0;
        break;
      case 's':
        $state = !$state;
        break;
    }
  };

  const handleResize = () => {
    if (!svg) return;

    const rect = svg.parentElement.getBoundingClientRect();

    height = rect.height;
    width = rect.width;
  };

  let t = -1;
  const start = time => {
    t === -1 && (t = time);
    time - t > 1000 && (t = time) &&
      d3.select('rect#seeker')
        .transition(10)
        .attr('x', ++$measure * bandwidth);
    $state === STATE.playing && requestAnimationFrame(start);
    $state === STATE.stopped && (t = -1);
  };

  $: $state === STATE.playing && requestAnimationFrame(start);
</script>

<svelte:document on:keydown={ handleKeyDown } />
<svelte:window on:resize={ handleResize } />

<div bind:this={ div } class="h-full">
  <svg bind:this={ svg } class="absolute top-0"></svg>
</div>
