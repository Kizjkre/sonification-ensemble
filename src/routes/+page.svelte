<script>
  import Filesystem from '$lib/components/Filesystem.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Upload from '$lib/components/Upload.svelte';
</script>

<div class="grid grid-rows-12 h-full">
  <main class="row-span-9">
    <Upload />
    <Graph />
  </main>
  <footer class="row-span-3">
    <Filesystem />
    <Settings />
  </footer>
</div>
