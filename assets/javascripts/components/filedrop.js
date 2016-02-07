angular.module('brightlabs-filedrop',[])
    .directive("fileDrop", function () {
        var directiveObj = {
            scope: {
                fileValue: "=",
                fileName: "=",
                validFileTypes:"="  //an array of valid mime types for this drop zone
                , dropFileError:"="
            },
            link: function (scope, element, attrs) {
                element.on('dragover', function (event) {
                    element.addClass('drop-file-enter');
                    event.preventDefault();
                    event.originalEvent.dataTransfer.effectAllowed = 'move';
                    return false;
                });

                element.on('dragenter', function (event) {
                    element.addClass('drop-file-enter');
                    event.preventDefault();
                    event.stopPropagation();
                });

                element.on('dragleave', function (event) {
                    element.removeClass('drop-file-enter');
                    event.preventDefault();
                    event.stopPropagation();
                });

                element.on('dragend', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                element.on('drop', function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    var files = event.originalEvent.dataTransfer.files;
                    var file = files[0];
                    //if no validfiletypes are set we accept all otherwise we check for the specified mime types
                    if(!scope.validFileTypes ||scope.validFileTypes.indexOf(file.type)>-1){
                        var reader = new FileReader();

                        reader.onload = function (event) {
                            scope.$apply(function () {
                                scope.fileValue = event.target.result;
                                scope.fileName = file.name;
                                scope.dropFileError= false
                            })
                        };
                        reader.readAsDataURL(file)

                    }
                    else{
                        scope.$apply(function () {
                            scope.dropFileError= true
                        })
                    }
                    element.removeClass('drop-file-enter');
                    return false;
                })

                scope.$watch('dropFileError', function(newValue, oldValue) {
                    if (newValue){
                        element.addClass('drop-file-error');
                    }
                    else{
                        element.removeClass('drop-file-error');
                    }
                }, true);
            }
        }

        return directiveObj;
    });