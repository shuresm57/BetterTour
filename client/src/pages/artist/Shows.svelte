<script>
  let { shows } = $props();

  const statusClass = {
    confirmed: 'bg-green-500/15 text-green-400',
    pending: 'bg-yellow-500/15 text-yellow-400'
  };

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
</script>

<div class="card p-6">
  <h2 class="text-xl font-bold mb-1">Upcoming Shows</h2>
  <p class="text-sm text-surface-400 mb-6">Your confirmed and pending bookings.</p>

  <div class="flex flex-col">
    {#each shows as show, i}
      <div class="py-4 {i !== 0 ? 'border-t border-surface-700' : ''}">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-semibold truncate">{show.event_name}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0 {statusClass[show.status] ?? 'bg-surface-700 text-surface-300'}">
                {show.status}
              </span>
            </div>
            <span class="text-sm text-surface-400">{formatDate(show.date)}</span>
            <span class="text-sm text-surface-400">{show.contact_of_day}</span>
          </div>
          <span class="text-xs font-mono bg-surface-800 px-2 py-1 rounded text-surface-300 shrink-0">
            {show.link_code}
          </span>
        </div>
        <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {#each Object.entries(show.schedule) as [key, value]}
            <div class="flex gap-1 text-sm">
              <span class="text-surface-500 capitalize">{key.replace(/_/g, ' ')}:</span>
              <span class="text-surface-200">{value}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
