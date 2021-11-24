<script>
  const { ipcRenderer, remote } = require("electron");

  import Tabs from "./Tabs.svelte";
  import { openDBName } from "./stores";

  export let selected;

  function trafficLight(arg) {
    ipcRenderer.send("traffic-lights", arg);
  }

  function openDBFile() {
    ipcRenderer.send("request-open-db-file");
  }
</script>

<main>
  <div
    class="bar normal tall "
    on:dblclick={() => {
      trafficLight('request-maximize-window');
    }}>
    <div class="buttons">
      <button
        on:click={() => {
          // trafficLight('request-quit-application');
          window.close();
        }} />
      <button
        on:click={() => {
          // trafficLight('request-minimize-window');
          remote.getCurrentWindow().minimize();
        }} />
      <button
        on:click={() => {
          trafficLight('request-toggle-fullscreen');
        }} />
    </div>
    <div class="title">{$openDBName || 'No Database'}</div>

    <div class="bar-buttons">
      <button class="btn plus" />
      <button
        class="btn folder"
        on:click={() => {
          openDBFile();
        }} />
      <button
        disabled={!$openDBName}
        class="btn logout {$openDBName ? null : 'disabled'}"
        on:click={() => {
          trafficLight('request-db-close');
        }} />
      <button class="btn cog dropdown space" />
    </div>

    <Tabs {selected} />
  </div>
</main>
