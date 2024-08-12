<script>
  import Samples from '$lib/components/Samples.svelte';
  import Upload from '$lib/components/Upload.svelte';
  import state, { STATE } from '$lib/stores/state.js';
  import sonify from '$lib/utils/sonify.js';
  import { createEventDispatcher } from 'svelte';

  const dispatcher = createEventDispatcher();
  const dispatch = name => e => dispatcher(name, e);

  const handleClear = async () => {
    localStorage.clear();
    await (await navigator.storage.getDirectory()).remove({ recursive: true });
    window.location.reload();
  };
  const handleStart = () => $state = !$state;
</script>

<section class="gap-1 grid grid-cols-2">
  <Upload />
  <button class="flex hover:text-red-400 text-left transition" on:click={ dispatch('hide') }>
    Hide menu (<kbd class="bg-gray-100 px-1 py-0.5 rounded text-red-400">esc</kbd>)
  </button>
  <button class="flex hover:text-red-400 text-left transition" on:click={ handleStart }>
    { $state === STATE.playing ? 'Stop' : 'Start' } (<kbd class="bg-gray-100 px-1 py-0.5 rounded text-red-400">shift</kbd>)
  </button>
  <button class="flex hover:text-red-400 text-left transition" on:dblclick={ handleClear }>
    Clear cache (double click)
  </button>
  <button class="flex hover:text-red-400 text-left transition" on:click={ sonify }>
    Sonify
  </button>
  <Samples />
</section>
