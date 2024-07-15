<script>
  import Upload from '$lib/components/Upload.svelte';
  import state, { STATE } from '$lib/stores/state.js';
  import { createEventDispatcher } from 'svelte';

  const dispatcher = createEventDispatcher();
  const dispatch = name => e => dispatcher(name, e);

  const handleStart = () => $state = !$state;
</script>

<section class="flex flex-col gap-2">
  <Upload />
  <button class="hover:text-red-400 text-left transition" on:click={ dispatch('hide') }>Hide menu (esc)</button>
  <button class="hover:text-red-400 text-left transition" on:click={ handleStart }>{ $state === STATE.playing ? 'Stop' : 'Start' }</button>
</section>
