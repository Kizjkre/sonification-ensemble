<script>
  import bpm from '$lib/state/bpm.svelte.js';
  import { data } from '$lib/state/data.svelte.js';
  import file from '$lib/state/file.svelte.js';
  import mode, { MODE } from '$lib/state/mode.svelte.js';
  import spectrum from '$lib/assets/spectrum.png';

  const handleBlur = e => e.target.blur();
</script>

<section class="gap-x-2 grid grid-cols-5 grid-rows-3">
  <div class="col-span-5 flex gap-4 justify-between">
    <h3 class="font-normal m-0">score settings.</h3>
    <img alt="Turbo spectrum" class="m-0 w-1/2" src={spectrum}>
  </div>
  {#if file.id in data}
  	<div class="flex flex-col row-span-2">
      <label class="px-2" for="x">x-axis</label>
      <select bind:value={data[file.id].x} class="border-2 border-gray-100 px-2 rounded" onchange={handleBlur} id="x">
        {#each data[file.id].columns as column, i (i)}
          <option value={i}>{column}</option>
        {/each}
        <option value={-1}>none</option>
      </select>
    </div>
    <div class="flex flex-col row-span-2">
      <label class="px-2" for="y">y-axis</label>
      <select bind:value={data[file.id].y} class="border-2 border-gray-100 px-2 rounded" onchange={handleBlur} id="y">
        {#each data[file.id].columns as column, i (i)}
          <option value={i}>{column}</option>
        {/each}
        <option value={-1}>none</option>
      </select>
    </div>
    <div class="flex flex-col row-span-2">
      <label class="px-2" for="color">color</label>
      <select bind:value={data[file.id].color} class="border-2 border-gray-100 px-2 rounded" onchange={handleBlur} id="color">
        {#each data[file.id].columns as column, i (i)}
          <option value={i}>{column}</option>
        {/each}
        <option value={-1}>none</option>
      </select>
    </div>
  {:else}
    <div class="flex flex-col row-span-2">
      <label class="px-2" for="x">x-axis</label>
      <select class="border-2 border-gray-100 px-2 rounded" disabled id="x">
        <option value="0">select a dataset</option>
      </select>
    </div>
    <div class="flex flex-col row-span-2">
      <label class="px-2" for="y">y-axis</label>
      <select class="border-2 border-gray-100 px-2 rounded" disabled id="y">
        <option value="0">select a dataset</option>
      </select>
    </div>
    <div class="flex flex-col row-span-2">
      <label class="px-2" for="color">color</label>
      <select class="border-2 border-gray-100 px-2 rounded" disabled id="color">
        <option value="0">select a dataset</option>
      </select>
    </div>
  {/if}
  <div class="flex flex-col row-span-2">
    <label class="px-2" for="bpm">bpm</label>
    <input bind:value={bpm.value} class="border-2 border-gray-100 px-2 rounded" id="bpm" max="240" min="20" type="number">
  </div>
  <div class="flex flex-col row-span-2">
    <label class="px-2" for="mode">mode</label>
    <select bind:value={mode.value} class="border-2 border-gray-100 px-2 rounded" onchange={handleBlur} id="mode">
      {#each Object.values(MODE) as m}
        <option value={m}>{m}</option>
      {/each}
    </select>
  </div>
</section>
