'use strict'
var directives = angular.module('7-11-lucia-directives',
    [])

/*directives.directive('blActiveNav', function ($location) {
    return{
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                    return $location.path();
                }, function (newValue, oldValue) {
                    $('li[active-route]', element).each(function (k, li) {
                        var $li = angular.element(li),
                            pattern = $li.attr('active-route'),
                            regexp = new RegExp('^' + pattern + '$', ['i']);

                        if (regexp.test(newValue)) {
                            $li.addClass('active');
                        } else {
                            $li.removeClass('active');
                        }
                    })
                }
            )
        }
    }
});*/

directives.directive('dnDisplayMode', function($window) {
    return {
        restrict: 'A',
        scope: {
            dnDisplayMode: '='
        },
        template: '<span class="mobile"></span><span class="tablet"></span><span class="tablet-landscape"></span><span class="desktop"></span>',
        link: function(scope, elem, attrs) {
            var markers = elem.find('span');

            function isVisible(element) {
                return element && element.style.display != 'none' && element.offsetWidth && element.offsetHeight;
            }

            function update() {
                angular.forEach(markers, function(element) {
                    if (isVisible(element)) {
                        scope.dnDisplayMode = element.className;
                        return false;
                    }
                });
            }

            var t;
            angular.element($window).bind('resize', function() {
                clearTimeout(t);
                t = setTimeout(function() {
                    update();
                    scope.$apply();
                }, 300);
            });

            update();
        }
    };
});

directives.directive('luciaImageOnload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                var luciaCrownDragBox = document.getElementById("lucia-crown-drag-box");


                var height = luciaCrownDragBox.clientHeight;
                var width = luciaCrownDragBox.clientWidth;

                var posX = width / 2;
                var posY = height / 2

                //Set the scale of luciacrown
                var scale = height / 690;
                var luciaCrown = document.getElementById("lucia-crown");
                //Show the lucia-crown after setting size, it's hidden by default
                luciaCrown.style.display = 'block';


                luciaCrown.style.width =  300 * scale + 'px';
                luciaCrown.style.height =  300 * scale + 'px';

                var startWidth = 300 * scale;
                var startHeight = 300 * scale;

                //move it into position
                luciaCrown.setAttribute('data-x', (posX - (luciaCrown.clientWidth /2))  + 'px');
                luciaCrown.setAttribute('data-y', 30 + 'px'); //(posY- (luciaCrown.clientWidth /2)

                luciaCrown.style.transform = 'translate(' + (posX - (luciaCrown.clientWidth /2)) + 'px, ' + 30 + 'px)';
                luciaCrown.style.webkitTransform = 'translate(' + (posX - (luciaCrown.clientWidth /2)) + 'px, ' + 30 + 'px)';

                var luciaCrownImg = document.getElementById("lucia-crown-img");
                luciaCrownImg.style.width =  300 * scale + 'px';
                luciaCrownImg.style.height =  300 * scale + 'px';


                var imageUploadSize = document.getElementById("image-upload-size");
                imageUploadSize.style.minHeight = imageUploadSize.clientWidth + "px";
                imageUploadSize.style.maxHeight = imageUploadSize.clientWidth + "px";


                var uploadContentWrapper = document.getElementById("upload-content-wrapper");
                uploadContentWrapper.style.minHeight = uploadContentWrapper.clientWidth + "px";
                uploadContentWrapper.style.maxHeight = uploadContentWrapper.clientWidth + "px";

                var localScale = 1;

                interact(luciaCrown)
                    .gesturable({
                        onstart: function (event) {

                        },
                        onmove: function (event) {
                            localScale = localScale * (1 + event.ds);

                            //scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(' + scale + ')';

                            // update the element's style
                            //luciaCrown.style.width  = (startWidth * scale) + 'px';
                            //luciaCrown.style.height = (startHeight * scale) + 'px';

                            var newWidth = (startWidth * localScale);
                            var newHeight = (startHeight * localScale);

                            if(newWidth > 350 || newWidth < 100)
                                return

                            if(newHeight > 350 || newHeight < 70)
                                return

                            luciaCrown.style.width  = newWidth + 'px';
                            luciaCrown.style.height = newHeight + 'px';

                            luciaCrownImg.style.width  = newWidth + 'px';
                            luciaCrownImg.style.height = newHeight + 'px';

                        }
                    })
                    .draggable(
                    { restrict: {
                        inertia: true,
                        restriction: "parent",
                        endOnly: true,
                        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                    },
                        onmove: dragMoveListener });
            });

        }
    };
});

/*directives.directive('uploadImageOnload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {

                var imageUploadSize = document.getElementById("image-upload-size");
                imageUploadSize.style.height = imageUploadSize.clientWidth;

                var scale = 1,
                    scaleElementImg = document.getElementById('scale-element-img'),
                    scaleElement = document.getElementById('scale-element'),// TODO cleanup, we are already doing this
                    resetTimeout;

                var startWidth = scaleElementImg.clientWidth;
                var startHeight = scaleElementImg.clientHeight;

                interact(scaleElement)
                    .gesturable({
                        onstart: function (event) {

                        },
                        onmove: function (event) {
                            scale = scale * (1 + event.ds);

                            //scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(' + scale + ')';

                            // update the element's style
                            //scaleElement.style.width  = (startWidth * scale) + 'px';
                            //scaleElement.style.height = (startHeight * scale) + 'px';

                            var newWidth = (startWidth * scale);
                            var newHeight = (startHeight * scale);

                            scaleElementImg.style.width  = newWidth + 'px';
                            scaleElementImg.style.height = newHeight + 'px';

                        },
                        onend: function (event) {

                        }
                    })
                    .draggable({ onmove: dragMoveListener });

            });
        }
    };
});*/



directives.directive('imageUploadBox', ['$http', '$translate', '$timeout', '$window', function ($http, $translate, $timeout, $window) {
    return{
        restrict: 'E',
        scope: {
            image: '=',    //An attachement object
            submittedBy: '=',
            mySubmission: '=',
            allowedTypes: '=',   //Pipe separated ex.'|jpg|png|jpeg|bmp|gif|'
            uploadUrl: '=',
            displayMode: '=',
            step: '=',
            takePicture: '&',
            uploadPicture: '&',
            createSubmission: '&'
        },
        templateUrl: 'assets/components/views/image-upload-box.html',
        link: function (scope, element, attrs) {
            //TODO if allowedtypes is not set set default to accept all
            // Fix delayed variable compile issue
            scope.errorMessage = "";
            scope.error = false;
            scope.imageFromStream = false;

            scope.hasGetUserMedia = function() {

                return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
            };

            scope.hideTooltipsVar = false;
            scope.hideTooltips = function () {
                $timeout(function() {
                    scope.hideTooltipsVar = true;
                },7000)
            }

            /*scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                var imageUploadSize = document.getElementById('image-upload-size')

                scope.uploadBoxSize = function () {
                    return {
                        'height': (imageUploadSize.screenHeight) + 'px'//,
                        //'width': (newValue.w - 100) + 'px'
                    };
                };
                console.log("updating......");
            }, true);*/

            scope.isRotating = false;
            scope.rotation = 0;
            scope.rotateImage = function () {
                if (scope.isRotating) {
                    //console.log("Abort, we are already rotating")
                    return;
                }
                scope.isRotating = true;

                if(scope.image.fullUrl) {

                    //TODO request new attachment with new rotation from backend
                    $http.get('submission/rotateAttachment/' + scope.mySubmission.originalImage.id).success(function (data) {
                        scope.fadeOutImg = true;

                        var scaleElement = document.getElementById('scale-element')
                        var scaleElementImg = document.getElementById('scale-element-img')
                        var tempWidth = scaleElementImg.clientWidth;
                        var tempHeight = scaleElementImg.clientHeight;

                        scaleElementImg.style.opacity = '0';
                        scope.mySubmission.originalImage = data;

                        $timeout(function() {
                            scaleElementImg.style.opacity = '1';

                            scaleElement.style.width  = tempHeight + 'px';
                            scaleElement.style.height = tempWidth + 'px';
                            scaleElementImg.style.width  = tempHeight + 'px';
                            scaleElementImg.style.height = tempWidth + 'px';
                            scope.isRotating = false;
                            scope.rotation = (scope.rotation + 90) % 360;
                        },2500)

                    }).error(function(result){
                        scope.isRotating = false;
                    });
                }
                else {
                    //console.log("no image to rotate")
                }

            }

            scope.isDesktop = function () {
                return scope.displayMode == "desktop";
            }

            scope.isMobile = function () {
                return scope.displayMode == "mobile";
            }

            /*scope.shouldHideTooltips = function () {
                console.log("hide tooltips? " + $window.hideTooltips)
                return $window.hideTooltips;
            }

            scope.$watch('$window.hideTooltips', function (newVal, oldVal) {
                console.log("hide tooltips? " + $window.hideTooltips);
            });*/

            scope.isStep = function (_step) {

                return scope.step == _step;
            }

            scope.usingVideoMedia = false;
            scope.setStep = function (_step) {
                //ugly fix for referenceerror when calling this function from streamInput (directive)
                if(_step == undefined) {
                    _step = 3;
                    scope.usingVideoMedia = true;
                }
                else {
                    scope.usingVideoMedia = false;
                }


                if(_step == 3) {
                    scope.hideTooltips();
                }

                if (_step == 4) {
                    var imageData = $('.image-editor').cropit('export');
                    scope.myAngularVariable = imageData;

                    document.querySelector('#result').src = imageData;
                }

                scope.step = _step;
            }

            scope.shouldShowImage = function () {
                if (scope.uploading || scope.error) {
                    return false;
                }

                if (scope.image && scope.image.fullUrl) {
                    return true;
                }
            }

        }
    }
}]);

directives.directive('streamInput', ['$http', function ($http) {
    return{
        restrict: 'E',
        scope: {
            image: '=',    //An attachement object  //Pipe separated ex.'|jpg|png|jpeg|bmp|gif|'
            uploadUrl: '=',
            step: '&'
        },
        templateUrl: 'assets/components/views/stream-input.html',
        link: function (scope, element, attrs) {

            //console.log("Stream input");

            scope.imageData = undefined;

            var video = document.querySelector('#streamingVideo');
            var canvas = document.querySelector('canvas');
            var ctx = canvas.getContext('2d');
            var img = document.querySelector('#html5');
            var localMediaStream = null;

            var errorCallback = function () {
              //console.log("nooo");
            };

            var constraints = { video: {
                mandatory: {
                    maxWidth: 819,
                    maxHeight: 819
                }
            }};

            navigator.getUserMedia  = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            // Not showing vendor prefixes or code that works cross-browser.
            navigator.getUserMedia(constraints, function(stream) {
                video.src = window.URL.createObjectURL(stream);
                localMediaStream = stream;
                scope.sizeCanvas();
            }, errorCallback);

            scope.save = function () {

                if (localMediaStream) {

                    // "image/webp" works in Chrome.
                    // Other browsers will fall back to image/png.

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    img.height = video.videoHeight;
                    img.width = video.videoWidth;

                    // Flip canvas
                    ctx.translate(video.videoWidth, 0);
                    ctx.scale(-1, 1);

                    // Draw the image
                    ctx.drawImage(video, 0, 0);

                    scope.imageData = canvas.toDataURL("image/png");
                    img.src = scope.imageData;

                    var imageEditor = $('.image-editor');
                    imageEditor.cropit('imageSrc', scope.imageData);

                    scope.step(2);
                }
            };

            scope.sizeCanvas = function() {
                // video.onloadedmetadata not firing in Chrome so we have to hack.
                // See crbug.com/110938.
                setTimeout(function() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    img.height = video.videoHeight;
                    img.width = video.videoWidth;
                }, 100);
            }


        }
    }
}]);
