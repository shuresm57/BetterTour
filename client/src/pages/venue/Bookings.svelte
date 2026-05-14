<script>
  let { shows } = $props();

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
</script>

<div class="card p-6">
  <h2 class="text-xl font-bold mb-1">Show Requests</h2>
  <p class="text-sm text-surface-400 mb-6">Incoming requests from artists and agents.</p>

  {#if shows.length > 0}
    <div class="flex flex-col">
      {#each shows as booking, i}
        <div class="py-5 {i !== 0 ? 'border-t border-surface-700' : ''}">
          <div class="flex items-start justify-between gap-4">
            <div class="flex flex-col gap-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold truncate">{booking.artist_name ?? booking.event_name}</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0
                  {booking.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'}">
                  {booking.status}
                </span>
              </div>
              <span class="text-sm text-surface-400">{formatDate(booking.date)}</span>
              {#if booking.note}
                <p class="text-sm text-surface-400 mt-1 italic">"{booking.note}"</p>
              {/if}
            </div>
            {#if booking.status === 'pending'}
              <div class="flex gap-2 shrink-0">
                <button class="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 text-green-400 transition-colors">
                  Accept
                </button>
                <button class="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 transition-colors">
                  Decline
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-sm text-surface-500">No shows yet.</p>
  {/if}
</div>
