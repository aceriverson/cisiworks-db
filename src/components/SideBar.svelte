<script>
  const { ipcRenderer } = require("electron");
  import { selectedRows, numberOfRows } from "./stores";
</script>

<div class="sidebar">
  <div class="heading">Records</div>
  <div class="items">
    <div class="item">Total: {$numberOfRows}</div>
    <div class="item">Selected: {$selectedRows.size}</div>
  </div>

  <!-- <div class="heading">Favourites</div>
    <div class="items">
      <div class="item allmyfiles">All My Files</div>
      <div class="item icloud">iCloud Drive</div>
      <div class="item airdrop">AirDrop</div>
      <div class="item applications">Applications</div>
      <div class="item desktop">Desktop</div>
      <div class="item documents active">Documents</div>
      <div class="item downloads">Downloads</div>
      <div class="item movies">Movies</div>
      <div class="item music">Music</div>
      <div class="item pictures">Pictures XD</div>
      <div class="item home">Luka</div>
      <div class="item laptop">Luka</div>
    </div>

    <div class="heading">Files</div>
    <div class="items">
      <div class="item folder">Folder</div>
      <div class="item file">File</div>
    </div>

    <div class="heading">Tags</div>
    <div class="items">
      <div class="item red">Red</div>
      <div class="item orange">Orange</div>
      <div class="item yellow">Yellow</div>
      <div class="item green">Green</div>
      <div class="item blue">Blue</div>
      <div class="item purple">Purple</div>
      <div class="item gray">Gray</div>
    </div> -->
</div>
