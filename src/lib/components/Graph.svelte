<script>
  import { browser } from '$app/environment';
  import bpm from '$lib/stores/bpm.js';
  import d from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
  import s from '$lib/stores/selected.js';
  import measure from '$lib/stores/measure.js';
  import state, { STATE } from '$lib/stores/state.js';
  import sonify from '$lib/utils/sonify.js';
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  const TRANSITION_DURATION = 50;

  let ctx;
  let reset;
  onMount(async () => {
    ({ ctx } = await import('$lib/utils/audio.js'));
    ({ reset } = await import('$lib/utils/sonify.js'));
  });

  let div;

  let svg;
  let height = 400;
  let width = 600;

  let bandwidth = 0;
  let padding = 0;

  let pi = NaN;

  let index;
  let data;
  let color;

  $: if ($s in $d) {
    index = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].index]]);
    data = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].y]]);
    color = $d[$s].data.map(d1 => d1[$d[$s].columns[$d[$s].color]]);

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
    if ($selected === -1) return;
    switch (e.key) {
      case ' ':
        if ($state === STATE.playing) break;
        d3.select('rect#seeker')
          .transition()
          .duration(TRANSITION_DURATION)
          .attr('x', ++$measure * bandwidth);
        break;
      case 'Backspace':
        if ($state === STATE.playing) break;
        d3.select('rect#seeker')
          .transition()
          .duration(TRANSITION_DURATION)
          .attr('x', --$measure * bandwidth);
        break;
      case 'Enter':
        if ($state === STATE.playing) break;
        d3.select('rect#seeker')
          .transition()
          .duration(TRANSITION_DURATION)
          .attr('x', 0);
        $measure = 0;
        break;
      case 'Shift':
        $state === STATE.playing ? reset(false) : sonify(false);
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
  const start = () => {
    t === -1 && (t = ctx.currentTime);
    ctx.currentTime - t > 60 / $bpm - TRANSITION_DURATION / 1000 && (t += 60 / $bpm) &&
      d3.select('rect#seeker')
        .transition()
        .duration(TRANSITION_DURATION)
        .attr('x', ++$measure * bandwidth);
    $state === STATE.playing && requestAnimationFrame(start);
    $state === STATE.stopped && (t = -1);
  };

  $: $state === STATE.playing && requestAnimationFrame(start);
  $: $state === STATE.stopped && (t = -1);
  $: browser && !$measure && d3.select('rect#seeker')
    .transition()
    .duration(TRANSITION_DURATION)
    .attr('x', 0);
  $: if ($measure === data?.length) {

  }
</script>

<svelte:window on:keydown={ handleKeyDown } on:resize={ handleResize } />

<div bind:this={ div } class="h-full">
  <svg bind:this={ svg } class="absolute top-0"></svg>
</div>
