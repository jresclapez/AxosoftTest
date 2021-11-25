
# AxosoftTest
#### Twitter feed app  for Axosoft technical test. 
#### Electron - React App which displays a Twitter feed. The Twitter search runs in the main process, as well as the storage of the last 5 searches.


#### Communication between the electron and the react app has been implemented using the ipcMain and ipcRender modules, respectively

##### It has been used for the prime-react library for the creation of react components

### Example of communication between electron and react app
###### ipcMain method from electron:
```js
ipcMain.handle('searchTweets', async (event, searchText) => {
    return await searchTweets(searchText);
});
```
###### ipcRender method from react app:
```js
const searchTweets = async (searchText) => {
    return await ipcRenderer.invoke('searchTweets', searchText);
};
```

### Setup and run start 

``` bash
# install dependencies
npm install

# start electron application for development
npm start
```

### Colne this repository
```git
git clone https://github.com/jresclapez/AxosoftTest.git
```

### Software Developer

Juan Ramon Esclapez Martínez.
