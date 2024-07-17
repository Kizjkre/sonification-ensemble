<script>
  import Filesystem from '$lib/components/Filesystem.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Title from '$lib/components/Title.svelte';
  import data from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
  import { onMount } from 'svelte';

  let div;
  let footer;
  let hidden = false;

  onMount(() => {
    localStorage.getItem('hidden') === 'true' && handleHide();

    const stored = localStorage.getItem('data');
    $data = stored ? JSON.parse(stored) : {};

    $selected = +localStorage.getItem('selected') || -1;
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
  <footer bind:this={ footer } class="gap-x-24 gap-y-2 grid grid-cols-2 grid-rows-2 justify-center px-24">
    <Filesystem />
    <Settings />
    <Menu on:hide={ handleHide } />
    <Title />
  </footer>
</div>

<svelte:window on:keydown={ handleKeyDown } />
