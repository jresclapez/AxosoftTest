const fs = require('fs');

function fileUpdate(file, formatFunction) {
  fs.access(file, function (error) {
    if (error) {
      console.log('error access');
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
  });

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
