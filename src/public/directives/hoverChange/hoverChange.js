angular.module('recipeatDirectives')
    .directive('hoverChange', hoverChange);

function hoverChange() {
    return {
        link: function(scope, element, attrs) {
            var originalText;

            $(element).on('mouseenter', function(event) {
                if (scope.changeIf) {
                    originalText = $(element).text();
                    $(this).text(scope.changeTo);
                }
            });

            $(element).on('mouseleave', function(event) {
                $(this).text(originalText);
            });
        },
        scope: {
            changeIf: '=',
            changeTo: '@'
        }
    }
}