<script>
  const { ipcRenderer } = require("electron");
  import { currentTab } from "./stores";

  // export let selected;

  // function changeTabs(tabName) {
  //   ipcRenderer.send("request-tab-change", tabName);
  // }
</script>

<div class="tabs">
  <div
    class="tab"
    on:click={() => {
      currentTab.set('table');
    }}
    class:active={$currentTab == 'table'}>
    Table
  </div>
  <div
    class="tab"
    on:click={() => {
      currentTab.set('columns');
    }}
    class:active={$currentTab == 'columns'}>
    Edit Columns
  </div>
  <div
    class="tab"
    on:click={() => {
      currentTab.set('viewer');
    }}
    class:active={$currentTab == 'viewer'}>
    Layout Viewer
  </div>
  <div
    class="tab"
    on:click={() => {
      currentTab.set('creator');
    }}
    class:active={$currentTab == 'creator'}>
    Layout Creator
  </div>
</div>
