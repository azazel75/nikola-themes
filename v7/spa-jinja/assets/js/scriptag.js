// -*- coding: utf-8 -*-
// :Progetto:  spa-jinja -- custom script element
// :Creato:    ven 07 nov 2014 02:17:28 CET
// :Autore:    Alberto Berti <alberto@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

define(['js!customelements'], function(){
    var proto = Object.create(HTMLElement.prototype),
        app_started = false;

    proto.createdCallback = onScriptCreate;
    proto.attachedCallback = onScriptAttached;

    document.registerElement('curl-script', {
        prototype: proto
    });

    function onScriptCreate() {
        this.style.visibility = 'hidden';
    }

    function onScriptAttached() {
        if (!app_started)
            return;
        var names = this.getAttribute('names'),
            modules = this.getAttribute('modules'),
            text = this.textContent, func;

        names = names ? names.split(',') : [];
        modules = modules ? modules.split(',') : [];
        names.push(text);
        func = new Function;
        func = Function.apply(func, names);
        curl(modules, func);
    }
    function markAppStarted() {
        app_started = true;
    }
    return markAppStarted;
 });
