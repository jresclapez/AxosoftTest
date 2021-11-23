const fs = require('fs');
const {JSON_FILE_SEARCHES} = require("./../constants")

function saveSearch (searchText, searchDate) {

    fs.readFile(JSON_FILE_SEARCHES, 'utf8',
        function readFileCallback(error, data){
        if (error){
            console.log(error);

        } else {
            const searches = JSON.parse(data).filter(item => item.search !== searchText);

            while(searches.length >= 5)
                      searches.shift()

                searches.push({
                    search_text: searchText,
                    searched_at:searchDate
                })

            fs.writeFile(JSON_FILE_SEARCHES, JSON.stringify(searches),
                function writeFileCallback(error){
                    if (error){
                        console.log(error);
                    }
            })
        }
    })

}


function getSearches(){

    fs.readFile(JSON_FILE_SEARCHES, 'utf8',
        function readFileCallback(error, data) {
            if (error) {
                console.log(error);

            } else {
                return data;
            }
        })

}



exports.saveSearch = saveSearch;
exports.getSearches = getSearches;