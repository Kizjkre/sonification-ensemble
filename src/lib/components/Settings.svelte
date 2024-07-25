<script>
  import data from '$lib/stores/data.js';
  import bpm from '$lib/stores/bpm.js';
  import selected from '$lib/stores/selected.js';
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
        </div>
      </div>
    </div>
  </section>
{ /if }
