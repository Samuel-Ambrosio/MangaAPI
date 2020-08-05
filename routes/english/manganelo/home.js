'use strict';

const express = require('express');
const scrapeIt = require('scrape-it');
const router = express.Router();

const URL = 'https://manganelo.com/genre-all/'

router.get('/:page', function(req, res) {
    const page = req.params.page;
    scrapeIt(URL + page, {
        mangas: {
            listItem: '.content-genres-item',
            data: {
                title: {
                    selector: 'a.genres-item-img',
                    attr: 'title'
                },
                lastChapter: {
                    selector: 'a.genres-item-chap',
                    how: 'html'
                },
                image: {
                    selector: 'img.img-loading',
                    attr: 'src'
                },
                link: {
                    selector: 'a.genres-item-img',
                    attr: 'href'
                }
            }
        }
    }).then(({data, response}) => {
        res.status(response.statusCode).json(data.mangas);
    })
});

module.exports = router;