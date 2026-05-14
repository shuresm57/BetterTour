<script>
  let { artist, shows, riders, onNavigate } = $props();

  let profilePhotoUrl = $state(null);
  let photoInput = $state();

  const confirmed = $derived(shows.filter(s => s.status === 'confirmed'));
  const pending = $derived(shows.filter(s => s.status === 'pending'));
  const nextShow = $derived(confirmed[0] ?? shows[0]);

  const statusClass = {
    confirmed: 'bg-green-500/15 text-green-400',
    pending: 'bg-yellow-500/15 text-yellow-400'
  };

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function onPhotoSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    profilePhotoUrl = URL.createObjectURL(file);
  }
</script>

<div class="grid grid-cols-2 gap-5">

  <!-- Profile -->
  <div class="card border border-surface-700 col-span-2 overflow-hidden">
    <div class="relative h-80 bg-surface-800 flex items-center justify-center group">
      {#if profilePhotoUrl}
        <img src={profilePhotoUrl} alt="Profile" class="absolute inset-0 w-full h-full object-cover" />
      {:else}
        <svg class="w-16 h-16 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      {/if}
      <input bind:this={photoInput} type="file" accept="image/*" class="hidden" onchange={onPhotoSelected} />
      <button
        onclick={() => photoInput.click()}
        class="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg
          bg-black/50 hover:bg-black/70 text-white transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload Photo
      </button>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
        <div class="flex flex-col gap-0.5 min-w-0">
          <h2 class="text-xl font-bold text-white">{artist.artist_name}</h2>
          <p class="text-sm text-white/60">{artist.bio}</p>
          <a href="mailto:{artist.contact_email}" class="text-xs text-blue-300 hover:underline mt-1">{artist.contact_email}</a>
        </div>
        <button
          onclick={() => onNavigate('profile')}
          class="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>

  <!-- Next Show -->
  <div class="card p-6 border border-blue-500/30 col-span-2">
    <h2 class="text-base font-semibold text-surface-300 mb-4">Next Show</h2>
    {#if nextShow}
      <div class="flex items-start justify-between gap-4">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-lg">{nextShow.event_name}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium {statusClass[nextShow.status] ?? 'bg-surface-700 text-surface-300'}">
              {nextShow.status}
            </span>
          </div>
          <span class="text-sm text-surface-400">{formatDate(nextShow.date)}</span>
          <span class="text-sm text-surface-400">{nextShow.contact_of_day}</span>
        </div>
        <span class="text-xs font-mono bg-surface-800 px-2 py-1 rounded text-surface-300 shrink-0">
          {nextShow.link_code}
        </span>
      </div>
      <ul class="mt-5 flex flex-col divide-y divide-surface-700">
        {#each Object.entries(nextShow.schedule) as [key, value]}
          <li class="flex items-center justify-between py-3">
            <span class="text-surface-400 capitalize">{key.replace(/_/g, ' ')}</span>
            <span class="font-mono text-lg font-semibold text-surface-100">{value}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-surface-500">No upcoming shows.</p>
    {/if}
  </div>

  <!-- Upcoming Shows -->
  <div class="card p-6 border border-surface-700">
    <h2 class="text-base font-semibold text-surface-300 mb-4">
      Upcoming Shows
      <span class="ml-2 text-xs font-normal text-surface-500">{confirmed.length} confirmed</span>
    </h2>
    {#if confirmed.length > 0}
      <div class="flex flex-col">
        {#each confirmed.slice(0, 4) as show, i}
          <div class="py-3 {i !== 0 ? 'border-t border-surface-700' : ''}">
            <p class="font-medium text-sm truncate">{show.event_name}</p>
            <p class="text-xs text-surface-400 mt-0.5">{formatDate(show.date)}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-surface-500">No confirmed shows yet.</p>
    {/if}
  </div>

  <!-- Requests -->
  <div class="card p-6 border border-surface-700">
    <h2 class="text-base font-semibold text-surface-300 mb-4">
      Requests
      <span class="ml-2 text-xs font-normal text-surface-500">{pending.length} pending</span>
    </h2>
    {#if pending.length > 0}
      <div class="flex flex-col">
        {#each pending as show, i}
          <div class="py-3 {i !== 0 ? 'border-t border-surface-700' : ''}">
            <div class="flex items-center justify-between gap-2">
              <p class="font-medium text-sm truncate">{show.event_name}</p>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium shrink-0 bg-yellow-500/15 text-yellow-400">pending</span>
            </div>
            <p class="text-xs text-surface-400 mt-0.5">{formatDate(show.date)}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-surface-500">No pending requests.</p>
    {/if}
  </div>

  <!-- Riders -->
  <div class="card p-6 border border-surface-700 col-span-2">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base font-semibold text-surface-300">Riders</h2>
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
              class="flex items-center justify-between py-3 group"
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

</div>
