'use strict';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = {
    formatDate: function (date) {
        var d = String(date.getDate()).padStart(2, '0') + '/' + (String(date.getMonth()+1)).padStart(2, '0') + '/' + date.getFullYear();
        var t = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
        return d + ' ' + t;
    },
    formatQuery: function (text) {
        var query = text.replaceAll(' ', '_');
        query = query.replaceAll('[^-\\w]', '');
        return query;
    },
    formatLastPage: function(lastPage) {
        var numb = lastPage.match(/\d/g);
        numb = numb.join("")
        return parseInt(numb);
    }
};