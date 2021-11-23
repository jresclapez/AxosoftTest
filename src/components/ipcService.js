const { ipcRenderer } = window.require('electron');

export default class IpcService {
  send(channel, request) {
    const ipcR = ipcRenderer;

    ipcR.send(channel, request);

    return new Promise((resolve) => {
      ipcR.on(`${channel}_response`, (event, response) => resolve(response));
    });
  }
}
