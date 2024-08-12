<script>
  import { onMount } from 'svelte';

  let add;
  onMount(async () => ({ add } = await import('$lib/utils/samples.js')));

  const handleUpload = e => {
    try {
      Array.from(e.target.files).forEach(async file => add(file.name, await file.arrayBuffer()));
    } catch {}
    e.target.value = null;
    e.target.blur();
  };
</script>

<section>
  <label class="cursor-pointer hover:text-red-400 transition" for="samples">Upload Samples</label>
  <input accept="audio/*" class="hidden" id="samples" multiple on:change={ handleUpload } type="file">
</section>
