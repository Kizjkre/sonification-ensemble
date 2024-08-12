<script>
  import data from '$lib/stores/data.js';
  import selected from '$lib/stores/selected.js';
  import { csvParse, autoType } from 'd3-dsv';

  const handleUpload = async e => {
    const raw = await e.target.files[0].text();
    try {
      const id = data.add(e.target.files[0].name, csvParse(raw, autoType));
      selected.set(id);
    } catch {}
    e.target.value = null;
    e.target.blur();
  };
</script>

<section>
  <label class="cursor-pointer hover:text-red-400 transition" for="upload">Upload Data</label>
  <input accept="text/csv" class="hidden" id="upload" on:change={ handleUpload } type="file">
</section>
