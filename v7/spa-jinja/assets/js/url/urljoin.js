// -*- coding: utf-8 -*-
/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2014-08-16[14:31:02]:authorized
 * 2014-08-19[14:05:43]:fixed crash when first piece is empty
 *
 * @author yanni4night@gmail.com
 * @version 0.1.1
 * @since 0.1.0
 */
/*jslint node: true */

define(['url/extend', 'url/url', 'url/path'], function(extend, url, path){
    "use strict";

    var exports;

    /**
     * Join two or more url pieces into one.
     *
     * Only the protocol/port/host in the first piece is saved,but all the get parameters
     * will be saved.
     *
     * @param {String|Function}... Multiple url pieces in function or string type.
     * @return {String} The URL joined.
     */
    exports = function urljoin() {

        //convert to Array
        var pieces = Array.prototype.slice.call(arguments);
        var query = {};
        var first, paths;

        if (!pieces.length) {
            return '';
        } else if (1 === pieces.length) {
            return pieces[0];
        }

        paths = pieces.map(function(piece) {
            var pieceStr = 'function' === typeof piece ? piece() : String(piece || "");

            if (!pieceStr) {
                return '';
            }

            var parsed = url.parse(pieceStr, true);

            if (!first && parsed) {
                first = parsed;
            }

            extend(query, parsed.query);
            return parsed.pathname;
        }).filter(function(piece) {
            return !!piece;
        });

        delete first.search; //we use query instead of search
        first.query = query;
        first.pathname = path.join.apply(path, paths);
        return url.format(first);
    };

    return exports;
});
