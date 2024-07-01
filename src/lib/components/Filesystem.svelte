<script>
  import data from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
</script>

<section>
  { #each Object.entries($data) as [id, d], i (i) }
    <label>
      <input bind:group={ $selected } type="radio" name="file" value={ +id }>
      { d.name }
    </label>
  { /each }
</section>
