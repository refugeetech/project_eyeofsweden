angular.module('angular-ui-overrides', ['ui.bootstrap'])
    .config(function ($provide) {
    $provide.decorator('uibCarouselDirective', function($delegate) {
        var directive = $delegate[0];

        directive.templateUrl = "assets/components/views/carouselOverride.tpl.html";

        return $delegate;
    });
});