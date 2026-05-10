<svelte:head>
  <title>BetterTour | About</title>
</svelte:head>

<script>

    const imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/James_Hetfield_with_Metallica_--_7_October_2004.jpg/960px-James_Hetfield_with_Metallica_--_7_October_2004.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail';

</script>

<div class="relative isolate page flex justify-center items-center max-h-screen">
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1d4ed8] to-[#60a5fa] opacity-25"></div>
  </div>
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b82f6] to-[#1e40af] opacity-20"></div>
  </div>
  <div class="flex items-center gap-30">
    <img src={imgSrc} class="rounded-lg w-180 object-cover" alt="about" />
    <div class="w-120">
      <h2 class="text-4xl text-right">Plan tours and manage gigs without the administrative nightmare.</h2>
      <p class="text-2xl mt-24 text-justify">
        Here at <span class="text-blue-500">BetterTour</span>, we strive to connect you faster - no matter whether you are an
        artist or a venue.
    </p>
    </div>
  </div>
</div>
