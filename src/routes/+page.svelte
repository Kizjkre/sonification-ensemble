<script>
  import Filesystem from '$lib/components/Filesystem.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Title from '$lib/components/Title.svelte';
  import Upload from '$lib/components/Upload.svelte';
</script>

<div class="grid grid-rows-12 h-full">
  <main class="row-span-9">
    <Upload />
    <Graph />
  </main>
  <footer class="gap-x-24 gap-y-2 grid grid-cols-2 grid-rows-2 justify-center px-24 row-span-3">
    <Filesystem />
    <Settings />
    <Menu />
    <Title />
  </footer>
</div>
