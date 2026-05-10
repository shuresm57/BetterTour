<script>
  import { Router, Route } from "svelte-routing";
  import { Toaster } from 'svelte-sonner';
  
  import Navbar from './components/Navbar.svelte'
  import LandingPage from './pages/LandingPage.svelte'
  import About from './pages/About.svelte'
  import Contact from './pages/Contact.svelte'
</script>

<Toaster position="bottom-right"></Toaster>

<Router>
  <Route path="/">
    <Navbar><LandingPage /></Navbar>
  </Route>
  <Route path="/about">
    <Navbar><About /></Navbar>
  </Route>
  <Route path="/contact">
    <Navbar><Contact /></Navbar>
  </Route>
</Router>
