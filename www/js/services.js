
console.log("11111111111111111");

angular.module('starter.services', ['starter.controllers'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('DataSource', function($http) {
    return {
        get : function(file, callback, transform) {
            $http.get(file, {
                transformResponse : transform
            }).success(function(data, status) {
                console.log("Request succeeded: "+file);
                callback(data);
            }).error(function(data, status) {
                console.log("Request failed " + status);
                alert(data);
            });
        }
    };
})

.factory('Tests', function($fileFactory, $ionicPlatform, $http, DataSource) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tests = [{
    id: 0,
    name: 'Local file',
    lastText: 'DONT ON BROWSER!!!',
    face: 'img/ben.png',
    testFun: function(){
      alert("go");

      var fs = new $fileFactory();
      console.log("cccc 1111111");
      $ionicPlatform.ready(function() {
          console.log("cccc 2222222");
          fs.testFileDo();
      });
    }
  }, {
    id: 1,
    name: 'JSON',
    lastText: 'stringify and parse',
    face: 'img/max.png',
    testFun: function(){

        var sssf = JSON.stringify({
          "name": "HelloIonic",
          "private": "true",
          "devDependencies": {
            "ionic": "driftyco/ionic-bower#1.3.0"
          }
        })
        var jsss = JSON.parse(sssf)
        console.log(sssf);
        console.log(jsss);
        console.log(jsss.name);
    }
  }, {
    id: 2,
    name: 'HTTP get file',
    lastText: 'www res',
    face: 'img/adam.jpg',
    testFun: function(){
      $http.get("res/test1.json").success(
        function(data){
          console.log(data);
        })
    }
  }, {
    id: 3,
    name: 'get and store',
    lastText: 'HTTP get file then save it in Document',
    face: 'img/perry.png',
    testFun: function(){
      
      //$http.get("http://www.runoob.com/js/js-strings.html").success(
      $http.get("res/test1.json").success(
        function(data){
          //console.log(data);

          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

            var fs = fileSystem;

            // create file
            fs.root.getFile('save_test1.json', {create: true, exclusive: true}, function(fileEntry) {
              console.log('A file ' + fileEntry.name + ' was created successfully.');
            }, File.errorHandler);

            // write file
            fs.root.getFile('save_test1.json', {create: false}, function(fileEntry) {
              fileEntry.createWriter(function(fileWriter) {
                // first write end then read
                fileWriter.onwriteend = function(){

                  // read file
                  fs.root.getFile('save_test1.json', {}, function(fileEntry) {
                    fileEntry.file(function(file) {
                      var reader = new FileReader();
                      reader.onloadend = function(e) {
                        //alert(this.result);
                        console.log(e.target.result.length);
                      };
                      reader.readAsText(file);     
                    }, File.errorHandler);
                  }, File.errorHandler);

                }

                var ddstr = JSON.stringify(data)
                var blob = new Blob([ddstr], {type: 'text/plain' });
                fileWriter.write(blob);
              }, File.errorHandler);
            }, File.errorHandler);

          })

        })
    }
  }, {
    id: 4,
    name: 'test name',
    lastText: 'detail',
    face: 'img/mike.png',
    testFun: function(){alert("4");}
  }];

  return {
    all: function() {
      return tests;
    },
    todoTest: function(test) {
      test.testFun();
    },
    remove: function(test) {
      tests.splice(tests.indexOf(test), 1);
    },
    get: function(testId) {
      for (var i = 0; i < tests.length; i++) {
        if (tests[i].id === parseInt(testId)) {
          return tests[i];
        }
      }
      return null;
    }
  };
});
