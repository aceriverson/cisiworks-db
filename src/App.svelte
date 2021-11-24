<script>
  import TopBar from "./components/TopBar.svelte";
  import SideBar from "./components/SideBar.svelte";
  import Table from "./components/Table.svelte";
  import Columns from "./components/Columns.svelte";
  import Viewer from "./components/Viewer.svelte";
  import Creator from "./components/Creator.svelte";

  import { currentTab } from "./components/stores";

  const { ipcRenderer } = require("electron");

  let chatter = "nothing";
  ipcRenderer.on("chat", (event, arg) => {
    chatter = arg;
  });
</script>

<style>
</style>

<main class="app">
  <link href="ion.css" rel="stylesheet" />

  <!-- <h1>{chatter}</h1> -->

  <TopBar />

  <SideBar />

  <div style="display: {$currentTab == 'table' ? 'block' : 'none'}">
    <Table />
  </div>

  <div style="display: {$currentTab == 'columns' ? 'block' : 'none'}">
    <Columns />
  </div>

  <div style="display: {$currentTab == 'viewer' ? 'block' : 'none'}">
    <Viewer />
  </div>

  <div style="display: {$currentTab == 'creator' ? 'block' : 'none'}">
    <Creator />
  </div>
</main>
