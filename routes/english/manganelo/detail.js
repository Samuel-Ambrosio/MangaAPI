'use strict';

const express = require('express');
const scrapeIt = require('scrape-it');
const tools = require('../../tools/functions');
const router = express.Router();

router.post('/', function(req, res) {
    const link = req.body.link;
    scrapeIt(link, {
        title: {
            selector: '.story-info-right h1'
        },
        image: {
            selector: '.panel-story-info .img-loading',
            attr: 'src'
        },
        author: {
            selector: '.story-info-right .variations-tableInfo .table-value',
            eq: 1
        },
        genres: {
            selector: '.story-info-right .variations-tableInfo .table-value',
            eq: 3
        },
        description: {
            selector: '.panel-story-info-description',
            how: 'html',
            texteq: 1
        },
        chapters: {
            listItem: '.row-content-chapter .a-h',
            data: {
                title: {
                    selector: 'a.chapter-name'
                },
                link: {
                    selector: 'a.chapter-name',
                    attr: 'href'
                },
                updateDate: {
                    selector: 'span.chapter-time',
                    attr: 'title',
                    convert: x => tools.formatDate(new Date(x))
                }
            }
        }
    }).then(({data, response}) => {
        res.status(response.statusCode).json(data);
    });
});

router.post('/lastChapter', function(req, res) {
    const link = req.body.link;
    scrapeIt(link, {
        title: {
            selector: '.row-content-chapter .a-h a.chapter-name',
            eq: 0
        },
        link: {
            selector: '.row-content-chapter .a-h a.chapter-name',
            attr: 'href'
        },
        updateDate: {
            selector: '.row-content-chapter .a-h span.chapter-time',
            attr: 'title',
            convert: x => tools.formatDate(new Date(x))
        }
    }).then(({data, response}) => {
        res.status(response.statusCode).json(data);
    });
});

module.exports = router;