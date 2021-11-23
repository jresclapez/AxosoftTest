const fs = require('fs');
const {JSON_FILE_SEARCHES, JSON_FILE_USERCONFIG} = require("./../constants")


function saveData (file, functionData) {
    fs.readFile(file, 'utf8',
        function readFileCallback(error, data){
            if (error)
                throw error;
            else

            fs.writeFile(file,functionData(JSON.parse(data))),
                function writeFileCallback(error) {
                    if (error)
                        throw error;
            }
        })
}


function saveSearch (searchText, searchDate) {

    saveData(JSON_FILE_SEARCHES, function (lastSearches) {

        const searches = lastSearches.filter(item => item.search !== searchText);

        while (searches.length >= 5)
            searches.shift()

        searches.push({
            search_text: searchText,
            searched_at: searchDate
        })
        return searches
    })
}

function getSearches(){

    return new Promise(function (resolve, reject) {

        fs.readFile(JSON_FILE_SEARCHES, 'utf8',
            function readFileCallback(error, data) {
                if (error)
                     reject(error);
                else
                    resolve(JSON.parse(data));
            })
    })
}

function saveToken (access_token) {
    saveData(JSON_FILE_USERCONFIG, function (userConfig) {
        userConfig.access_token = access_token
    })
}


exports.saveSearch = saveSearch;
exports.getSearches = getSearches;
exports.saveToken = saveToken;