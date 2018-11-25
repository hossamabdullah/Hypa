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
        "This message is from Dialogflow's Cloud Functions for Firebase editor!"
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
    // console.log(meta.title);
    // console.log(meta.meta);
    // console.log(meta.desc)
    if(counter == 3){
      return res.json({
        fulfillmentMessages: cards,
        outputContexts: []
      });
    }
    
  });

  // console.log("callback not just finished")
  // console.log("counter = "+counter)
  // return res.json({
  //   fulfillmentMessages: [
  //     {
  //       text: {
  //         text: [
  //           "This message is from Dialogflow's Cloud Functions for Firebase editor!"
  //         ]
  //       }
  //     },
  //     {
  //       card: {
  //         title: "Title: this is a card title",
  //         subtitle: "This is the body text of a card.  You can even use line\n  breaks and emoji! 💁",
  //         imageUri: "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
  //         buttons: [
  //           {
  //             text: "This is a button",
  //             postback: "https://assistant.google.com/"
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       quickReplies: {
  //         quickReplies: [
  //           "Quick Reply",
  //           "test"
  //         ]
  //       }
  //     }
  //   ],
  //   outputContexts: []
  // });
});

restService.get("/test", function(req, res){
  return res.json({
    test: "Test"
  })
})

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
