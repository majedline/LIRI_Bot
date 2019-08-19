var fs = require('fs');

function Helper() {

    this.fileName = "log.txt";

    this.saveTextToFile = function (command, text) {
        var divider = "\n======================== " + command + " ========================\n";

        fs.appendFile(this.fileName, divider + text, function (error) {
            if (error) throw err;
            console.log('\nRecords Saved in logs!\n****************************\n');
        });
    }

    this.saveArrayToFile = function (command, list) {
        var divider = "\n======================== " + command + " ========================\n";

        var x = "";
        for (var i = 0; i < list.length; i++) {
            x += list[i] + "\n";
        }

        fs.appendFile(this.fileName, divider + x, function (error) {
            if (error) throw err;
            console.log('\nRecords Saved in logs!\n****************************\n');
        });
    }

}

module.exports = Helper;
