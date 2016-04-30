
console.log("11111111111111111");
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('TestsCtrl', function($scope, Tests) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.tests = Tests.all();
  $scope.todoTest = function(test) {
    Tests.todoTest(test);
  };
})

.factory("$fileFactory", function($q) {

    var File = function() { };

    File.prototype = {

        errorHandler:function(err) {
         var msg = 'An error occured: ';

          switch (err.code) { 
            case FileError.NOT_FOUND_ERR: 
              msg += 'File or directory not found'; 
              break;

            case FileError.NOT_READABLE_ERR: 
              msg += 'File or directory not readable'; 
              break;

            case FileError.PATH_EXISTS_ERR: 
              msg += 'File or directory already exists'; 
              break;

            case FileError.TYPE_MISMATCH_ERR: 
              msg += 'Invalid filetype'; 
              break;

            default:
              msg += 'Unknown Error'; 
              break;
          };

         console.log(msg);
        },

        getParentDirectory: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                fileSystem.getParent(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        testFileDo: function() {
          console.log(cordova.file.applicationDirectory);

          var deferred = $q.defer();
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

            var fs = fileSystem;
            console.log(fs);

            // create directory
            fs.root.getDirectory('Documents', {create: true}, function(dirEntry) {
              //alert('You have just created the ' + dirEntry.name + ' directory.');
            }, File.errorHandler);

            // create file
            console.log("1111");
            fs.root.getFile('test.txt', {create: true, exclusive: true}, function(fileEntry) {
              alert('A file ' + fileEntry.name + ' was created successfully.');
            }, File.errorHandler);

            // write file
            console.log("22222");
            fs.root.getFile('test.txt', {create: false}, function(fileEntry) {
              fileEntry.createWriter(function(fileWriter) {
                console.log("3333");
                // window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder; 
                // console.log("4444");
                // var bb = new BlobBuilder();
                // console.log("5555");
                // bb.append('Filesystem API is awesome!');


                var blob = new Blob(['Filesystem API is awesome!']);

                fileWriter.write(blob); 
                console.log("6666");
              }, File.errorHandler);
            }, File.errorHandler);

            // read file
            fs.root.getFile('test.txt', {}, function(fileEntry) {
              fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                  alert(this.result);          
                };
                reader.readAsText(file);     
              }, File.errorHandler);
            }, File.errorHandler);
          }, function(error) {
              deferred.reject(error);
          });
        },

        getEntriesAtRoot: function() {
          console.log(cordova.file.applicationDirectory);

            var deferred = $q.defer();
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                var directoryReader = fileSystem.root.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntries: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                var directoryReader = fileSystem.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    };

    return File;

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicPlatform, $fileFactory) {
  $scope.chat = Chats.get($stateParams.chatId);

  // var cordova = require('cordova');
  // console.log(cordova.file.applicationDirectory);


  // $http.get('/notes').success(function (data) {
  //   $scope.notes = data;
  // }).error(function (err) {
  //   $scope.error = 'Could not load notes';
  // });

  var fs = new $fileFactory();
  console.log("cccc 1111111");
  $ionicPlatform.ready(function() {
      console.log("cccc 2222222");
      fs.testFileDo();
      // fs.getEntriesAtRoot().then(function(result) {
      //     console.log(result);
      //     $scope.files = result;
      // }, function(error) {
      //     console.error(error);
      // });

      // $scope.getContents = function(path) {
      //     fs.getEntries(path).then(function(result) {
      //         $scope.files = result;
      //         $scope.files.unshift({name: "[parent]"});
      //         fs.getParentDirectory(path).then(function(result) {
      //             result.name = "[parent]";
      //             $scope.files[0] = result;
      //         });
      //     });
      // }
  });




})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
