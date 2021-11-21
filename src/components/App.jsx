import React from 'react';
const { ipcRenderer } = window.require('electron');

const App = () => {
    return (
        <div className="App">

            <button onClick={()=>{
                const AsyncMessage = "Get Tweets"
                ipcRenderer.send('anything-asynchronous', AsyncMessage)
                    console.log("[App] Sending Request: ",AsyncMessage)

                ipcRenderer.on('asynchronous-reply', (event, response) => {
                    console.log("[App] Main Process Response: ", response)
                })

            }}>Get Tweets -> log.console!</button>


            {/*<button onClick={()=>{*/}

            {/*    // prints "pong"*/}
            {/*    console.log("[App] Sync Request: ping")*/}
            {/*    console.log("[App] Sync Response:  ", ipcRenderer.sendSync('anything-synchronous', 'ping'))*/}

            {/*}}>Send SyncMessage</button>*/}

        </div>

    );
}

export default App; 