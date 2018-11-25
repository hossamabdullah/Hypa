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
  console.log(req.body.queryResult.intent.displayName)
  console.log(req.body.queryResult.queryText)
  if(req.body.queryResult.intent.displayName == 'GetMe10kDocumentsForCompany'){
    console.log(req.body.queryResult.parameters)
    var companyName = req.body.queryResult.parameters.Client
    console.log(companyName)
    var year = req.body.queryResult.parameters.number
    console.log(year)
    var appleName = "Apple"
    var microsoftName = "Microsoft"
    var response = []
    
    if(companyName.toUpperCase() == appleName.toUpperCase()){
      if(year == 2012){
        response.push({
          text: {
            text: [
              "https://drive.google.com/file/d/1k90Oqpxk7o_WU7yk1Lcx5Ex12ih9JbJy/view?usp=sharing"    
            ]
          }
        })
      }else if(year==2014){
        response.push({
          text: {
            text: [
              "https://drive.google.com/file/d/152GHJ4_yAPaUCfXW9lORijncJ5lmcZbX/view?usp=sharing"    
            ]
          }
        })
      }else{
        response.push({
          text: {
            text: [
              "Please specify a proper year"    
            ]
          }
        })
      }
    }
    else if(companyName.toUpperCase() == microsoftName.toUpperCase()){
      if(year == 2012){
        response.push({
          text: {
            text: [
              "https://drive.google.com/file/d/1czY3LrDyyh_DGtAIj7ZXBgtrn2fwJymS/view"    
            ]
          }
        })
      }else if(year==2014){
        response.push({
          text: {
            text: [
              "https://drive.google.com/file/d/1czY3LrDyyh_DGtAIj7ZXBgtrn2fwJymS/view"    
            ]
          }
        })
      }else{
        response.push({
          text: {
            text: [
              "Please specify a proper year"    
            ]
          }
        })
      }
    }
    else{
      response.push({
        text: {
          text: [
            "Please specify a proper company"    
          ]
        }
      })
    }
    res.json({
      fulfillmentMessages: response,
      outputContexts: []
    });
    return res
  }else{
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
  }
});

restService.get("/test", function(req, res){
  return res.json({
    test: "Test"
  })
})

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
