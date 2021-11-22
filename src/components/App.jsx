import React, { useState } from 'react';
import IpcService from "./ipcService"
//import 'regenerator-runtime/runtime'

const ipc = new IpcService()


const App = () => {




    const [searchText, setSearchText] = useState([]);
    const [tweets, setTweets] = useState([]);

    const handleButtonOnClhange = async (request) => {
        setSearchText(request);
    }

    const handleButtonOnKeyDown = async (request) => {
        const tweetsResult = await ipc.send('twitter', searchText)
        setTweets(tweetsResult)
    }


    return (
        <div className="App">

            <input type="test"
                   placeholder="type your search here"
                   value={searchText}
                   onKeyDown={(event) => { if(event.key === 'Enter')  { handleButtonOnKeyDown() } } }
                   onChange={({target})=> {
                           handleButtonOnClhange(target.value)
                   }
            }/>

                {tweets.data ? (
                    <ul>
                        {tweets.data.map((item,index)=> (<li key={index}>{item.text}</li>))}

                    </ul>
                ):(
                   <div>"No hay resultados"</div>
                )

                }
        </div>

    );
}

export default App; 