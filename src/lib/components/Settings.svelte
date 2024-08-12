<script>
  import data from '$lib/stores/data.js';
  import bpm from '$lib/stores/bpm.js';
  import selected from '$lib/stores/selected.js';
  import matrix from '$lib/stores/matrix.js';
  import { csvParseRows } from 'd3-dsv';

  const handleMatrix = async e => $matrix = csvParseRows(await e.target.files[0].text());
</script>

{ #if $selected === -1 }
  <section></section>
{ :else }
  <section>
    <h2 class="font-bold text-sm">Settings</h2>
    <div class="gap-8 grid grid-cols-2">
      <div>
        <h3 class="font-bold text-sm">Graph Settings</h3>
        <div class="grid grid-cols-2">
          <label for="settings-index">Index</label>
          <select id="settings-index" bind:value={ $data[$selected].index }>
            { #each $data[$selected]?.columns || [] as c, i }
              <option value={ i }>{ c }</option>
            { /each }
            <option value={ -1 }>None</option>
          </select>

          <label for="settings-y">Y</label>
          <select id="settings-y" bind:value={ $data[$selected].y }>
            { #each $data[$selected]?.columns || [] as c, i }
              <option value={ i }>{ c }</option>
            { /each }
            <option value={ -1 }>None</option>
          </select>

          <label for="settings-color">Color</label>
          <select id="settings-color" bind:value={ $data[$selected].color }>
            { #each $data[$selected]?.columns || [] as c, i }
              <option value={ i }>{ c }</option>
            { /each }
            <option value={ -1 }>None</option>
          </select>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-sm">Playback Settings</h3>
        <div class="grid grid-cols-2">
          <label for="settings-rate">BPM</label>
          <input bind:value={ $bpm } class="outline-0" id="settings-rate" min="1" type="number">
          <label class="cursor-pointer hover:text-red-400 transition" for="matrix">
            Upload Sample Matrix
            <input accept="text/csv" class="hidden" id="matrix" on:change={ handleMatrix } type="file">
          </label>
        </div>
      </div>
    </div>
  </section>
{ /if }
