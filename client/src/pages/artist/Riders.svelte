<script>
  let { riders } = $props();
</script>

<div class="card p-6">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-bold">Riders</h2>
      <p class="text-sm text-surface-400 mt-1">Your current rider documents.</p>
    </div>
    <button class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-surface-100 transition-colors">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Rider
    </button>
  </div>

  {#if riders.length > 0}
    <ul class="flex flex-col divide-y divide-surface-700">
      {#each riders as rider}
        <li>
          <a
            href={rider.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between py-4 group"
          >
            <span class="font-medium group-hover:text-blue-400 transition-colors">{rider.name}</span>
            <svg class="w-4 h-4 text-surface-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-sm text-surface-500">No riders uploaded yet.</p>
  {/if}
</div>
