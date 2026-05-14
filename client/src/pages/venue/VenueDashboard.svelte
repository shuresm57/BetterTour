<script>
  import DashboardNav from '../../components/DashboardNav.svelte';
  import Overview from './Overview.svelte';
  import Bookings from './Bookings.svelte';
  import Profile from './Profile.svelte';
  import { Progress } from '@skeletonlabs/skeleton-svelte';
  import { onMount } from 'svelte';
  import { fetchGet } from '../../util/fetchUtil.js';

  let activeSection = $state('overview');
  let venue = $state(null);
  let shows = $state([]);
  let techSpecs = $state([]);
  let loading = $state(true);

  onMount(async () => {
    const res = await fetchGet('/api/venue/dashboard');
    if (res?.ok) {
      const data = await res.json();
      venue = data.venue;
      shows = data.shows.map(s => ({ ...s, schedule: JSON.parse(s.schedule) }));
      techSpecs = data.techSpecs;
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>BetterTour | Venue Dashboard</title>
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
      {#if !venue}
        <p class="text-surface-400">Could not load venue data.</p>
      {:else if activeSection === 'overview'}
        <Overview {venue} {shows} {techSpecs} onNavigate={(id) => activeSection = id} />
      {:else if activeSection === 'shows'}
        <Bookings {shows} />
      {:else if activeSection === 'profile'}
        <Profile {venue} />
      {/if}
    </div>
  </div>

  <DashboardNav {activeSection} onNavigate={(id) => (activeSection = id)} />
{/if}
