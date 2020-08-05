'use strict';

const express = require('express');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const router = express.Router();

router.post('/', function(req, res) {
    const link = req.body.link;
    var opt = {
        uri: link,
        method: 'GET'
    };
    var list = [];
    cloudscraper(opt)
        .then(function(body) {
            const $ = cheerio.load(body);
            $(".container-chapter-reader img").each(function (index, element) {
                list.push($(element).attr('src'));
            });
            res.status(200).send(list);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(list);
        });
});

module.exports = router;