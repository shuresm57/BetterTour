<script>
  import DashboardNav from '../../components/DashboardNav.svelte';
  import Overview from './Overview.svelte';
  import Shows from './Shows.svelte';
  import Profile from './Profile.svelte';
  import { Progress } from '@skeletonlabs/skeleton-svelte';
  import { onMount } from 'svelte';
  import { fetchGet } from '../../util/fetchUtil';

  let activeSection = $state('overview');
  let artist = $state(null);
  let shows = $state([]);
  let riders = $state([]);
  let loading = $state(true);

  onMount(async () => {
    const res = await fetchGet('/api/artist/dashboard');
    if (res?.ok) {
      const data = await res.json();
      console.log('[dashboard] data:', data);
      artist = data.artist;
      shows = data.shows.map(show => ({ ...show, schedule: JSON.parse(show.schedule) }));
      riders = data.riders;
    }
    loading = false;
  });
  
</script>

<svelte:head>
  <title>BetterTour | Artist Dashboard</title>
</svelte:head>

{#if loading}
  <div class="fixed inset-0 flex items-center justify-center">
    <Progress>
      <Progress.Circle>
        <Progress.CircleTrack />
        <Progress.CircleRange />
      </Progress.Circle>
    </Progress>
  </div>
{:else}
  <div class="min-h-screen">
    <div class="pt-24 px-8 pb-8 max-w-5xl mx-auto">
      {#if !artist}
        <p class="text-surface-400">Could not load artist data.</p>
      {:else if activeSection === 'overview'}
        <Overview {artist} {shows} {riders} onNavigate={(id) => activeSection = id} />
      {:else if activeSection === 'shows'}
        <Shows {shows} />
      {:else if activeSection === 'profile'}
        <Profile {artist} />
      {/if}
    </div>
  </div>

  <DashboardNav {activeSection} onNavigate={(id) => (activeSection = id)} />
{/if}
