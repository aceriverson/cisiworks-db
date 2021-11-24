// import { ipcRenderer } from 'electron';
import { writable } from 'svelte/store';
const { ipcRenderer } = require('electron')

export const rawDBData = writable([]);
export const selectedRows = writable(new Set());
export const numberOfRows = writable(0);
export const tableInfo = writable([]);
export const openDBName = writable();
export const currentTab = writable('table');
const emptySet = new Set()

ipcRenderer.on("open-db-file", (event, arg) => {
    rawDBData.set(arg);
    numberOfRows.set(arg.length);
  });

ipcRenderer.on("request-db-close", (event, arg) => {
    rawDBData.set([]);
    numberOfRows.set(0);
    tableInfo.set([]);
    openDBName.set();
    // selectedRows.clear();
    // selectedRows.set(emptySet);
  });

ipcRenderer.on("db-table-info", (event, arg) => {
    tableInfo.set(arg)
})

ipcRenderer.on('new-db-open', (event, arg) => {
    openDBName.set(arg)
})