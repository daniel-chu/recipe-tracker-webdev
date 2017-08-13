angular.module('RecipEat')
    .directive('dcOnEnter', dcOnEnter);

function dcOnEnter() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.dcOnEnter);
                });

                event.preventDefault();
            }
        });
    };
}