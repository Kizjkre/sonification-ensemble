<script>
  import data from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
</script>

<section class="border-b border-b-black border-dashed flex flex-col overflow-scroll">
  { #each Object.entries($data) as [id, d], i (i) }
    <label
      class="block cursor-pointer transition"
      class:file-selected={ $selected === +id }
      class:text-red-400={ $selected === +id }
    >
      <input bind:group={ $selected } class="hidden" name="file" type="radio" value={ +id }>
      { d.name }
    </label>
  { /each }
</section>
