import React, { useState } from 'react';
import IpcService from "./ipcService"

const ipc = new IpcService()


const App = () => {

    const [searchText, setSearchText] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchDisabled, setSearchDisabled] = useState(false);

    const handleButtonOnClhange = async (request) => {
        setSearchText(request);
    }

    const handleButtonOnKeyDown = async () => {
        setSearchDisabled(true)
        const searchResponse = await ipc.send('twitter', searchText)
        setSearchResult(searchResponse)
        setSearchDisabled(false)
        getLastSearches()
    }

    const getLastSearches = async () => {
        const lastSearches = await ipc.send('infoSearch')
        console.log(lastSearches)
    }



    return (
        <div className="App">
            <h1> Twitter Feeds </h1>
            <input type="test"
                   disabled={searchDisabled}
                   placeholder="type your search here"
                   value={searchText}
                   onKeyDown={(event) => { if(event.key === 'Enter')  { handleButtonOnKeyDown() } } }
                   onChange={({target})=> {
                           handleButtonOnClhange(target.value)
                   }
            }/>

                {searchResult.data ? (
                    <ul>
                        {searchResult.data.map((item,index)=> (<li key={index}>{item.text}</li>))}
                    </ul>
                ):(
                   <div>No results found...</div>
                )

                }
        </div>

    );
}

export default App; 