<script>
  import { handleLogout } from '../util/authService.svelte.js';

  let { activeSection, onNavigate } = $props();
</script>

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full border border-surface-700 bg-surface-900/80 backdrop-blur-md shadow-xl">

  <button
    onclick={() => onNavigate('overview')}
    class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
      {activeSection === 'overview' ? 'bg-blue-500/15 text-blue-400' : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'}"
  >
    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    Overview
  </button>

  <button
    onclick={() => onNavigate('shows')}
    class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
      {activeSection === 'shows' ? 'bg-blue-500/15 text-blue-400' : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'}"
  >
    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    Shows
  </button>

  <div class="w-px h-5 bg-surface-700 mx-1"></div>

  <button
    onclick={() => onNavigate('profile')}
    class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
      {activeSection === 'profile' ? 'bg-blue-500/15 text-blue-400' : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'}"
  >
    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    Profile
  </button>

</nav>

<button
  onclick={handleLogout}
  class="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-surface-700 bg-surface-900/80 backdrop-blur-md shadow-xl transition-colors text-surface-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
>
  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
  Logout
</button>
