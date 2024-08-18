<script>
  import Samples from '$lib/components/Samples.svelte';
  import Upload from '$lib/components/Upload.svelte';
  import selected from '$lib/stores/selected.js';
  import state, { STATE } from '$lib/stores/state.js';
  import { predict } from '$lib/utils/cnn.js';
  import sonify, { reset } from '$lib/utils/sonify.js';
  import { createEventDispatcher } from 'svelte';

  const dispatcher = createEventDispatcher();
  const dispatch = name => e => dispatcher(name, e);

  const handleClear = async () => {
    localStorage.clear();
    await (await navigator.storage.getDirectory()).remove({ recursive: true });
    window.location.reload();
  };

  const handleToggle = () => $state === STATE.playing ? reset(false) : sonify(false);
</script>

<section class="gap-1 grid grid-cols-2">
  <Upload />
  <button class="flex hover:text-red-400 text-left transition" on:click={ dispatch('hide') }>
    Hide menu (<kbd class="bg-gray-100 px-1 py-0.5 rounded text-red-400">esc</kbd>)
  </button>
  <button
    class="flex hover:text-red-400 text-left transition"
    class:hover:text-gray-400={ $selected === -1 }
    class:text-gray-400={ $selected === -1 }
    disabled={ $selected === -1 }
    on:click={ handleToggle }
  >
    { $state === STATE.playing ? 'Stop' : 'Start' } (<kbd class="bg-gray-100 px-1 py-0.5 rounded text-red-400">shift</kbd>)
  </button>
  <button class="flex hover:text-red-400 text-left transition" on:dblclick={ handleClear }>
    Clear cache (double click)
  </button>
  <Samples />
</section>
