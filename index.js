"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  console.log("body")
  console.log(req.body)
  console.log(req.body.queryResult.intent.displayName)
  console.log(req.body.queryResult.queryText)
  

  console.log("tryyyyyyying google search scrapper api----------")
  var scraper = require('google-search-scraper');
  var options = {
    query: req.body.queryResult.queryText,
    limit: 3
  };

  var counter = 0
  var cards = []
  cards.push({
    text: {
      text: [
        "Those links will help you"
      ]
    }
  })
  scraper.search(options, function(err, url, meta) {
    // This is called for each result
    if(err) throw err;
    console.log(url);
    counter = counter + 1
    cards.push({
      card: {
        title: meta.title,
        subtitle: meta.desc,
        imageUri: "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
        buttons: [
          {
            text: "Try this link",
            postback: url
          }
        ]
      }
    })
    if(counter == 3){
      return res.json({
        fulfillmentMessages: cards,
        outputContexts: []
      });
    }
    
  });
});

restService.get("/test", function(req, res){
  return res.json({
    test: "Test"
  })
})

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
