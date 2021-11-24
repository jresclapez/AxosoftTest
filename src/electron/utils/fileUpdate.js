const fs = require('fs');

function fileUpdate(file, formatFunction) {
  // if file not exists,   new file its created
  if (!fs.existsSync(file)) {
    fs.open(file, 'wx', function (error, fd) {
      if (error) {
        return error;
      }
      fs.close(fd, function (error) {
        if (error) {
          return error;
        }
      });
    });
  }

  // function that reads data from file, formats data and write formatted data into file
  fs.readFile(file, 'utf8', function readFileCallback(error, data) {
    if (error) {
      throw error;
    } else {
      fs.writeFile(
        file,
        formatFunction(data),
        function writeFileCallback(error) {
          if (error) {
            throw error;
          }
        }
      );
    }
  });
}

module.exports = fileUpdate;
