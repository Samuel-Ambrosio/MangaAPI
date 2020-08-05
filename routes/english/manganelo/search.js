'use strict';

const express = require('express');
const scrapeIt = require('scrape-it');
const tools = require('../../tools/functions');
const router = express.Router();

const URL = 'https://manganelo.com/search/story/';
const URL_PAGE = '?page=';

router.post('/', function(req, res) {
    const text = tools.formatQuery(req.body.text);
    const page = req.body.page;

    scrapeIt(URL + text + URL_PAGE + page, {
        mangas: {
            listItem: '.search-story-item',
            data: {
                title: {
                    selector: 'a.item-img',
                    attr: 'title'
                },
                lastChapter: {
                    selector: 'a.item-chapter',
                    how: 'html',
                    texteq: 0
                },
                image: {
                    selector: 'img.img-loading',
                    attr: 'src'
                },
                link: {
                    selector: 'a.item-img',
                    attr: 'href'
                }
            }
        },
        lastPage: {
            selector: '.page-last',
            how: 'html',
            convert: x => tools.formatLastPage(x)
        }
    }).then(({data, response}) => {
        if (page > data.lastPage) {
            res.status(response.statusCode).json([]);
        } else {
            res.status(response.statusCode).json(data.mangas);
        }
    })
});

module.exports = router;