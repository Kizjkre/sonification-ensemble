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
        <select id="settings-index" bind:value={ $data[$selected].data.index }>
          { #each $data[$selected]?.data.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
      <div>
        <label for="settings-y">Y</label>
        <select id="settings-y" bind:value={ $data[$selected].data.y }>
          { #each $data[$selected]?.data.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
      <div>
        <label for="settings-color">Color</label>
        <select id="settings-color" bind:value={ $data[$selected].data.color }>
          { #each $data[$selected]?.data.columns || [] as c, i }
            <option value={ i }>{ c }</option>
          { /each }
          <option value={ -1 }>None</option>
        </select>
      </div>
    </div>
  </section>
{ /if }
