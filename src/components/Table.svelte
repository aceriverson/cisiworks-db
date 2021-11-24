<script>
  const { ipcRenderer } = require("electron");
  import { selectedRows, rawDBData, tableInfo, currentTab } from "./stores";

  let lastSelected;

  ipcRenderer.on("request-db-close", (event, args) => {
    $selectedRows.clear();
    $selectedRows = $selectedRows;
  });

  function differenceIncluding(a, b) {
    a > b ? ([a, b] = [b, a]) : null;
    let returnArray = [];
    for (var i = a; i <= b; i++) {
      returnArray.push(i);
    }
    return returnArray;
  }

  function manageSelectedRows(row, event) {
    if (event.shiftKey) {
      let toBeSelected = [];
      toBeSelected = toBeSelected.concat(
        differenceIncluding(row, lastSelected)
      );
      toBeSelected.forEach((x) => {
        $selectedRows.add(x);
      });
      $selectedRows = $selectedRows;
      return 1;
    }

    if (event.key == "Escape") {
      $selectedRows.clear();
      $selectedRows = $selectedRows;
      return 1;
    }

    $selectedRows.has(row) ? $selectedRows.delete(row) : $selectedRows.add(row);
    lastSelected = row;
    $selectedRows = $selectedRows;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    (e.key == 'Escape' || e.key == '') && $currentTab == 'table' ? manageSelectedRows(null, e) : null;
  }} />

<div class="tablex alt">
  <table style="position: relative">
    <thead>
      <tr>
        {#each $tableInfo as { name }}
          <th>{name}</th>
        {/each}
      </tr>
    </thead>
    <tbody style="overflow-y: scroll">
      {#each $rawDBData as row, i}
        <tr
          class={$selectedRows.has(i) ? 'active' : null}
          on:click={(e) => {
            manageSelectedRows(i, e);
          }}>
          {#each Object.values(row) as dataCell}
            <td>{dataCell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
