// -*- coding: utf-8 -*-
(function () {

    curl.config({
        baseUrl: '/assets/js',
        paths: {
            curl: 'curl/curl',
            jquery: 'jquery.min',
            underscore: 'backbone.marionette/underscore',
            backbone: 'backbone.marionette/backbone',
            marionette: 'backbone.marionette/backbone.marionette',
            nunjucks: 'nunjucks/nunjucks',
            'json!': '/assets/json'
        }
    });

    curl(['underscore', 'jquery',  'backbone', 'marionette', 'nunjucks'])
        .then(function (_, $, Backbone, Marionette, nunjucks) {
            // Initialize nunjucks template system and plug it in inside Marionette
            var template_env = nunjucks.configure('/assets/view', { autoescape: false });
            Marionette.TemplateCache.prototype.loadTemplate = function(templateId){
                return template_env.getTemplate(templateId);
            };
            Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
                return nunjucks.compile(rawTemplate);
            };
            Marionette.Renderer.render = function(template, data){
                var template = Marionette.TemplateCache.get(template);
                return template.render(data);
            };
        });
})();
