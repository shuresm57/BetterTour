<script>
  import { Tabs, ToggleGroup } from '@skeletonlabs/skeleton-svelte';
  import { handleLogin, handleSignup, handlePasswordRecovery } from '../util/authService.svelte.js';
  import Footer from '../components/Footer.svelte';

  let view = $state('login');

  let usernameInput = $state('');
  let passwordInput = $state('');

  let signupUsername = $state('');
  let signupPasswordOne = $state('');
  let signupPasswordTwo = $state('');
  let signupEmail = $state('');

  let recoveryEmail = $state('');

  let userType = $state(['artist']);

  function showLogin() { view = 'login'; }
</script>

<svelte:head>
  <title>BetterTour | {view === 'recovery' ? 'Recover Password' : view === 'signup' ? 'Sign Up' : 'Login'}</title>
</svelte:head>

<div class="relative isolate flex min-h-screen items-center justify-center">
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1d4ed8] to-[#60a5fa] opacity-25"></div>
  </div>
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b82f6] to-[#1e40af] opacity-20"></div>
  </div>
  <div class="card p-10 w-full max-w-lg space-y-6 mt-[-720px] outline outline-2 outline-blue-500 bg-blue-950/30 text-xl [&_.label-text]:text-xl [&_.input]:text-xl">
    <Tabs value={view} onValueChange={(d) => (view = d.value)}>
      <Tabs.List class="justify-center">
        <Tabs.Trigger value="login" class="text-2xl">Login</Tabs.Trigger>
        <Tabs.Trigger value="signup" class="text-2xl">Sign Up</Tabs.Trigger>
        <Tabs.Trigger value="recovery" class="text-2xl">Recover</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Content value="login">
        <div class="space-y-4 mt-4">
          <label class="label">
            <span class="label-text text-xl">Username</span>
            <input class="input text-xl" type="text" bind:value={usernameInput} required />
          </label>
          <label class="label">
            <span class="label-text text-xl">Password</span>
            <input class="input text-xl" type="password" bind:value={passwordInput} required />
          </label>
          <button class="btn-primary w-1/2 mx-auto block" type="button" onclick={() => handleLogin(usernameInput, passwordInput)}>
            Login
          </button>
        </div>
      </Tabs.Content>

      <Tabs.Content value="signup">
        <div class="space-y-4 mt-4">
          <ToggleGroup
            value={userType}
            onValueChange={(d) => (userType = d.value)}
            deselectable={false}
            class="flex w-full"
          >
            <ToggleGroup.Item value="artist" class="btn preset-outlined-primary-500 flex-1 h-10 text-base">Artist</ToggleGroup.Item>
            <ToggleGroup.Item value="venue" class="btn preset-outlined-primary-500 flex-1 h-10 text-base">Venue</ToggleGroup.Item>
          </ToggleGroup>
          <label class="label">
            <span class="label-text text-xl">Email</span>
            <input class="input text-xl" type="email" bind:value={signupEmail} required />
          </label>
          <label class="label">
            <span class="label-text text-xl">Username</span>
            <input class="input text-xl" type="text" bind:value={signupUsername} required />
          </label>
          <label class="label">
            <span class="label-text text-xl">Password</span>
            <input class="input text-xl" type="password" bind:value={signupPasswordOne} required />
          </label>
          <label class="label">
            <span class="label-text text-xl">Repeat Password</span>
            <input class="input text-xl" type="password" bind:value={signupPasswordTwo} required />
          </label>
          <button class="btn-primary w-1/2 mx-auto block" type="button" onclick={() => handleSignup(signupEmail, signupUsername, signupPasswordOne, signupPasswordTwo, showLogin)}>
            Create Account
          </button>
        </div>
      </Tabs.Content>

      <Tabs.Content value="recovery">
        <div class="space-y-4 mt-4">
          <label class="label">
            <span class="label-text text-xl">Email</span>
            <input class="input text-xl" type="email" bind:value={recoveryEmail} required />
          </label>
          <button class="btn-primary w-1/2 mx-auto block" type="button" onclick={() => handlePasswordRecovery(recoveryEmail, showLogin)}>
            Send reset link
          </button>
        </div>
      </Tabs.Content>
    </Tabs>
    </div>
</div>

<Footer />
