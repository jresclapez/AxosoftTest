import React, { useState } from 'react';
import IpcService from "./ipcService"
//import 'regenerator-runtime/runtime'

const ipc = new IpcService()


const App = () => {




    const [searchText, setSearchText] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchDisabled, setSearchDisabled] = useState(false);

    const handleButtonOnClhange = async (request) => {
        setSearchText(request);
    }

    const handleButtonOnKeyDown = async (request) => {
        setSearchDisabled(true)
        const searchResponse = await ipc.send('twitter', searchText)
        setSearchResult(searchResponse)
        setSearchDisabled(false)
    }


    return (
        <div className="App">

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
                   <div>"No hay resultados"</div>
                )

                }
        </div>

    );
}

export default App; 