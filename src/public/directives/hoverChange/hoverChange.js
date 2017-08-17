angular.module('recipeatDirectives')
    .directive('hoverChange', hoverChange);

function hoverChange() {
    return {
        link: function(scope, element, attrs) {
            var originalText;
            var originalBackgroundColor;
            var originalBorderColor;

            $(element).on('mouseenter', function(event) {
                if (scope.changeIf) {
                    originalText = $(element).text();
                    originalBackgroundColor = $(element).css('background-color');
                    originalBorderColor = $(element).css('border-color');

                    $(this).text(scope.changeTo);
                    $(this).css('background-color', scope.changeColor);
                    $(this).css('border-color', scope.changeColor);
                }
            });

            $(element).on('mouseleave', function(event) {
                $(this).text(originalText);
                $(this).css('background-color', originalBackgroundColor);
                $(this).css('border-color', originalBorderColor);
            });
        },
        scope: {
            changeIf: '=',
            changeTo: '@',
            changeColor: '@'
        }
    }
}