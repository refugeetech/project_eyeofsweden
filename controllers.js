'use strict'

var controllers = angular.module('7-11-lucia-controllers',[]);


controllers.controller('startController',['$scope', '$sce', '$window', 'smoothScroll', '$http', function($scope, $sce, $window, smoothScroll, $http){

    $scope.videos = [];
    $scope.nextVideos = [];
    $scope.currentVideo = null;
    $scope.tagValues = {};

    $scope.trustSrc = function(src) {
        if (src == undefined) return;
        return $sce.trustAsResourceUrl(src + "?modestbranding=1&autohide=1&showinfo=0&controls=0");
    };

    $scope.getRandomVideo = function () {
        $scope.currentVideo = $scope.videos[Math.floor((Math.random() * $scope.videos.length))];
        console.log("playing video " + $scope.currentVideo.url)

    };
    
    $scope.loadVideos = function () {
        console.log("loadVideos");
        $http.get('vote.php').success(function(data) {
            if (!data.video) return;
            $scope.currentVideo = {
                id: data.video.id,
                url: data.video.link,
                title: data.video.title,
                tags: data.video.tags
            };
        });

        $http.get('related.php').success(function(data) {
            var related = data.related;
            if (!related) return;

            for (var i=0; i<related.length; i++) {
                var video = related[i];
                $scope.nextVideos.push({
                    id: video.id,
                    url: video.link,
                    title: video.title
                });
            }
        });
    };

    $scope.loadVideos();

    $scope.like = function () {
        console.log("like");
        var vid = $scope.currentVideo.id;
        $scope.getVideo(vid, 1);
    };

    $scope.nextVideo = function () {
        console.log("next!");
        var vid = $scope.currentVideo.id;
        $scope.getVideo(vid, 0);
    };

    $scope.getVideo = function(vid, rating) {
        console.log("vid", vid, "rating", rating);
        $http.get('vote.php?video_id=' + vid + '&rate=' + rating).success(function(data) {
            if (!data.video) return;
            $scope.currentVideo = {
                id: data.video.id,
                url: data.video.link,
                title: data.video.title,
                tags: data.video.tags
            };
        });
    };

    $scope.previousVideo = function () {
        console.log("previous!");
        $scope.nextVideo();
    };

    $scope.clickVideo = function (video) {
        console.log("clicking a video");
        $scope.currentVideo = video;

        var element = document.getElementById('video-top');

        smoothScroll(element);
    };

    $scope.scrollDown = function () {
        var element = document.getElementById('mightLike');

        smoothScroll(element);
    };

    $scope.isDesktop = function () {
        return $scope.displayMode == "desktop";
    };

    $scope.isMobile = function () {
        return $scope.displayMode == "mobile";
    };

    $scope.loadDimensions = function () {
        var w = angular.element($window);
        $scope.windowHeight = w.height();
        $scope.windowWidth = w.width();

        if ($scope.windowWidth < 809) {
            $scope.displayMode = "mobile"
        }
        else {
            $scope.displayMode = "desktop"
        }

        $scope.mainVideoWrapper = function () {
            if($scope.isDesktop()) {
                return {
                    'height': ($scope.windowHeight*0.7) + 'px'
                };
            }
            else {
                return {
                    'height': ($scope.windowHeight*0.7) + 'px'
                };
            }
        };

        $scope.infoBox = function () {
            if($scope.isDesktop()) {
                return {
                    'height': ($scope.windowHeight*0.3) + 'px'
                };
            }
            else {
                return {
                    'height': ($scope.windowHeight*0.3) + 'px'
                };
            }
        };

        $scope.mainVideo = function () {
            if($scope.isDesktop()) {
                return {
                    'margin-left': ($scope.windowWidth*0.15) + 'px',
                };
            }
            else {
                return {
                    'margin-left': ($scope.windowWidth*0.15) + 'px',
                };
            }
        };

        $scope.swipeButton = function () {
            if($scope.isDesktop()) {
                return {
                    'margin-top': (($scope.windowHeight*0.70)/2)-15 + 'px',
                };
            }
            else {
                return {
                    'margin-top': (($scope.windowHeight*0.70)/2)-15 + 'px',
                };
            }
        };

        $scope.likeMiddle = function () {
            if($scope.isDesktop()) {
                return {
                    'margin-top': ($scope.windowHeight*0.70)-50 + 'px',
                    'margin-left': ($scope.windowWidth/2)-50 + 'px',
                };
            }
            else {
                return {
                    'margin-top': ($scope.windowHeight*0.70)-50 + 'px',
                    'margin-left': ($scope.windowWidth/2)-50 + 'px',
                };
            }
        }
    };
    $scope.loadDimensions();

    angular.element($window).bind('resize', function(){
        $scope.loadDimensions();

        // Manual $digest required as resize event is outside of angular
        $scope.$digest();
    });


}]);

