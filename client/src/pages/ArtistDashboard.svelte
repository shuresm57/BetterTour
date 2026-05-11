<script>
  import { userStore } from '../stores/userStore.svelte.js';
  let loading = $state(true);
</script>

<svelte:head>
  <title>BetterTour | Artist Dashboard</title>
</svelte:head>

{#if loading}
  <div class="card p-4 space-y-4">
    <div class="placeholder animate-pulse w-1/3"></div>
    <div class="placeholder animate-pulse"></div>
    <div class="placeholder animate-pulse w-2/3"></div>
  </div>
{:else}
  <div class="p-8">
    <h1 class="h2">Artist Dashboard</h1>
    <p>Welcome, {userStore.user?.name ?? 'Error: Artist name not found'}.</p>
  </div>
{/if}
