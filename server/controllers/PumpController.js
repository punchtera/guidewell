const fs = require("fs");
const path = require('path');
const { parse } = require("csv-parse");
const HandleRequest = require("../src/service/HandleRequest.js");

module.exports = {
    getData: HandleRequest.asyncHandleRequest(async (req, res, next) => {
        const pumpDataArray = [];
        const NUMBER_OF_RETURNING_ELEMENTS = 10;
        const inputFile = path.resolve(__dirname, "./demoPumpDayData.csv");
        fs.createReadStream(inputFile)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {                
                    const stringData = row[3];
                    const jsonData = JSON.parse(stringData)["Psum"];

                    pumpDataArray.push(jsonData);
                })
                .on("end", function () {
                    console.log("finished");
                    
                    const startingIndex = Number(req.query.start) || 1;
                    const returnArray = pumpDataArray.slice(startingIndex,
                         startingIndex * NUMBER_OF_RETURNING_ELEMENTS + 1);
                    res.json({Data: returnArray});
                })
                .on("error", function (error) {
                    console.log(error.message);
                });
    })
}

