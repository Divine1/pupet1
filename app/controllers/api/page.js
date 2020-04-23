//
// Name:    page.js
// Purpose: Controller and routing for full page text
// Creator: Tom Söderlund
//

'use strict'

const express = require('express');
const helpers = require('../helpers');
const csvRead = require("./../../../csvRead");

/*
const scrapePageContent = function (req, res, next) {
  const pageUrl = decodeURIComponent(req.query.url)
  const loadExtraTime = req.query.time || 1000
  const bodyOnly = req.query.bodyOnly

  console.log(`Scrape text: "${pageUrl}", ${loadExtraTime} ms`)

  helpers.fetchPageWithPuppeteer(pageUrl, { loadExtraTime, bodyOnly })
    .then(documentHTML => {
      res.json({
        url: pageUrl,
        length: documentHTML.length,
        content: documentHTML
      })
    })
    .catch(err => {
      console.error({ err }, Object.keys(err))
      const statusCode = 400
      res.status(statusCode).json({ statusCode, message: err.toString() })
    })
}
*/
const test = async (req,res)=>{
  const query = req.query;
  console.log("query ",query)
  try{
    let CSV_LINK = req.query.CSV_LINK;
    let title = req.query.title;
    let h1 = req.query.h1;
    let inputParam={
      CSV_LINK : CSV_LINK,
      title : title,
      h1 : h1
    }
    console.log("inputParam ",inputParam)
    await csvRead.invokeApify(inputParam)
    res.status(200).json({ message : "success"})
  }
  catch(Err){
    console.log("err ",Err)
    res.status(500).json({ message : "failed"})
  } 
}

// Routes

module.exports = function (app, config) {
  const router = express.Router()
  app.use('/', router)

  //router.get('/api/page', scrapePageContent)
  router.get('/api/page', test)
}
