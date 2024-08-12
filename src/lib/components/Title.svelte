<script>
  import Keyboard from '$lib/assets/Keyboard.svelte';
</script>

<section class="flex justify-between">
  <section class="flex items-center">
    <Keyboard />
  </section>
  <section class="flex flex-col items-end justify-end pb-4">
    <h1 class="font-display text-7xl">Ensonification.</h1>
    <!--suppress JSUnresolvedReference -->
    <h6 class="text-xs">version { meta.version }, built 07-23-2024.</h6>
  </section>
</section>
