<script>
  import data from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
</script>

{ #if $selected === -1 }
  <section></section>
{ :else }
  <section>
    <div>
      <h2>Graph Settings</h2>
      <div>
        <label for="settings-index">Index</label>
        <select id="settings-index" bind:value={ $data[$selected].index }>
          { #each $data[$selected]?.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
      <div>
        <label for="settings-y">Y</label>
        <select id="settings-y" bind:value={ $data[$selected].y }>
          { #each $data[$selected]?.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
      <div>
        <label for="settings-color">Color</label>
        <select id="settings-color" bind:value={ $data[$selected].color }>
          { #each $data[$selected]?.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
    </div>
  </section>
{ /if }
