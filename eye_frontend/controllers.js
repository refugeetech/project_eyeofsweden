'use strict'

var controllers = angular.module('7-11-lucia-controllers',[]);


controllers.controller('startController',['$scope', '$sce', '$window', 'smoothScroll', function($scope, $sce, $window, smoothScroll){

    $scope.videos = [];
    $scope.nextVideos = [];
    $scope.currentVideo = { url: "", tags: [] }
    $scope.tagValues = {}

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.getRandomVideo = function () {
        $scope.currentVideo = $scope.videos[Math.floor((Math.random() * $scope.videos.length))];
        console.log("playing video " + $scope.currentVideo.url)
    }

    $scope.loadVideos = function () {
        $scope.videos = $scope.videos.concat(
            [
                { id: 1, url: "https://www.youtube.com/embed/cCKvtxg1ZTs", title: "Teacher",tags: ["education", "teacher", "school"]},
                { id: 2, url: "https://www.youtube.com/embed/cCKvtxg1ZTs", title: "Hermods high school in Sweden",tags: ["swedish","school","education","language"]},
                { id: 3, url: "https://www.youtube.com/embed/nPJm6Hbtwrg", title: "How to become a doctor (PhD) in Sweden. Step-by-step.",tags: ["phd","university","doctoral","education","doctor"]},
                { id: 4, url: "https://www.youtube.com/embed/mhxcpaJE_j4", title: "My Swedish School",tags: ["education","school","everyday"]},
                { id: 5, url: "https://www.youtube.com/embed/FofjbSdsgq4", title: "Teachers TV- How Do They Do It In Sweden?",tags: ["education","teacher","school","teaching"]},
                { id: 6, url: "https://www.youtube.com/embed/ImytBfwJbkA", title: "How to be a student in Sweden",tags: ["education","studen","school","university","everyday"]}
            ]
        );

        $scope.getRandomVideo();
        $scope.nextVideos = $scope.videos;
    }
    $scope.loadVideos();

    $scope.like = function () {
        for(var i = 0; i < $scope.currentVideo.tags.length; i++) {
            if(!$scope.tagValues[$scope.currentVideo.tags[i]])
                $scope.tagValues[$scope.currentVideo.tags[i]]=0;
            $scope.tagValues[$scope.currentVideo.tags[i]]++;
        }

        $scope.getRandomVideo();
    }

    $scope.dislike = function () {
        for(var i = 0; i < $scope.currentVideo.tags.length; i++) {
            if(!$scope.tagValues[$scope.currentVideo.tags[i]]) {
                $scope.tagValues[$scope.currentVideo.tags[i]] = 0;
            }

            $scope.tagValues[$scope.currentVideo.tags[i]]--;
        }

        $scope.getRandomVideo();
    }

    $scope.clickVideo = function (video) {
        console.log("clicking a video");
        $scope.currentVideo = video;

        var element = document.getElementById('video-top');

        smoothScroll(element);
    }

    $scope.scrollDown = function () {
        var element = document.getElementById('mightLike');

        smoothScroll(element);
    }

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
        }

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
        }

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
        }

        $scope.likeMiddle = function () {
            if($scope.isDesktop()) {
                return {
                    'margin-top': ($scope.windowHeight*0.67) + 'px',
                    'margin-left': ($scope.windowWidth/2)-75 + 'px',
                };
            }
            else {
                return {
                    'margin-top': ($scope.windowHeight*0.67) + 'px',
                    'margin-left': ($scope.windowWidth/2)-75 + 'px',
                };
            }
        }
    }
    $scope.loadDimensions();

    angular.element($window).bind('resize', function(){
        $scope.loadDimensions();

        // Manual $digest required as resize event is outside of angular
        $scope.$digest();
    });


}]);

