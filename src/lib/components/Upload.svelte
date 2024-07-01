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
  };
</script>

<section>
  <input on:change={ handleUpload } type="file">
</section>
