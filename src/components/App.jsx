import React from 'react';
const { ipcRenderer } = window.require('electron');



ipcRenderer.on('asynchronous-reply', (event, response) => {
    console.log("[App] Main Process Response: ", response)
})

const App = () => {
    return (
        <div className="App">

            <button onClick={()=>{

                const request = {
                    target : "twitter",
                    action: "getTweetsByUsername",
                    parameters: {
                        username: "bbcmundo",
                        maxTweets: 50
                    }
                }

                ipcRenderer.send('anything-asynchronous', request)
                    console.log("[App] Sending Request: ",request)

            }}>Get Tweets -> log.console!</button>


            <button onClick={()=>{

                const request = {
                    target : "electron",
                    action: "getLastSearches"
                }

                ipcRenderer.send('anything-asynchronous', request)
                console.log("[App] Sending Request: ",request)

            }}>Get Searches -> log.console!</button>


            {/*<button onClick={()=>{*/}

            {/*    // prints "pong"*/}
            {/*    console.log("[App] Sync Request: ping")*/}
            {/*    console.log("[App] Sync Response:  ", ipcRenderer.sendSync('anything-synchronous', 'ping'))*/}

            {/*}}>Send SyncMessage</button>*/}

        </div>

    );
}

export default App; 