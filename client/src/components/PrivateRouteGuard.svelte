<script>
  import { navigate } from 'svelte-routing';
  import { Progress } from '@skeletonlabs/skeleton-svelte';
  import { userStore } from '../stores/userStore.svelte.js';

  let { children } = $props();

  $effect(() => {
    if (userStore.authChecked && !userStore.user) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if userStore.authChecked && userStore.user}
  {@render children()}
{:else if !userStore.authChecked}
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <p class="text-surface-400">Loading...</p>
    <Progress value={null}><Progress.Track><Progress.Range /></Progress.Track></Progress>
  </div>
{/if}
