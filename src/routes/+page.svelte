<script>
  import Filesystem from '$lib/components/Filesystem.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import Manual from '$lib/components/Manual.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Title from '$lib/components/Title.svelte';
  import data from '$lib/stores/data.js';
  import bpm from '$lib/stores/bpm.js';
  import matrix from '$lib/stores/matrix.js';
  import pad from '$lib/stores/pad.js';
  import selected from '$lib/stores/selected.js';
  import handlePad from '$lib/utils/pad.js';
  import { onMount } from 'svelte';

  let div;
  let hidden = false;

  onMount(async () => {
    await import('../lib/utils/audio.js');
    const { list } = await import('../lib/utils/samples.js');

    localStorage.getItem('hidden') === 'true' && handleHide();

    const storedData = localStorage.getItem('data');
    const storedMatrix = localStorage.getItem('matrix');
    $data = storedData ? JSON.parse(storedData) : {};
    $matrix = storedMatrix ? JSON.parse(storedMatrix) : {};
    $selected = +localStorage.getItem('selected') || -1;
    $bpm = +localStorage.getItem('bpm') || 60;
    $pad = (await list()).map(f => f.name.split('.').slice(0, -1).join('.'));
  });

  const handleHide = () => {
    div.classList[hidden ? 'remove' : 'add']('grid-rows-mainFullscreen');
    hidden = !hidden;

    localStorage.setItem('hidden', hidden);
  };

  const handleKeyDown = e => e.key === 'Escape' && handleHide();
</script>

<div bind:this={ div } class="grid grid-rows-main h-full transition-all">
  <main>
    <Graph />
  </main>
  <footer class="gap-x-24 gap-y-2 grid grid-cols-2 grid-rows-2 justify-center px-24">
    <section class="gap-12 grid grid-cols-2">
      <Filesystem />
      <Manual />
    </section>
    <Settings />
    <Menu on:hide={ handleHide } />
    <Title />
  </footer>
</div>

<svelte:window on:keydown={ handleKeyDown } />
<svelte:document on:keydown={ handlePad } />
