const fs = require('fs');
const {JSON_FILE_SEARCHES} = require("./../constants")


function saveSearch (request) {

    fs.readFile(JSON_FILE_SEARCHES, 'utf8',
        function readFileCallback(err, data){

        if (err){
            console.log(err);

        } else {
            const obj = JSON.parse(data);
            obj.push({search_text: request, searched_at: Date.now()});
            console.log(obj)
            const json = JSON.stringify(obj);
            fs.writeFile(JSON_FILE_SEARCHES, json,
                function writeFileCallback(err){
                    if (err){
                        console.log(err);
                    }
                }


            )}
        })

}


exports.saveSearch = saveSearch;