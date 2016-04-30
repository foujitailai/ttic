
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

.factory('Tests', function($fileFactory, $ionicPlatform) {
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
    name: 'test name',
    lastText: 'detail',
    face: 'img/max.png',
    testFun: function(){alert("1");}
  }, {
    id: 2,
    name: 'test name',
    lastText: 'detail',
    face: 'img/adam.jpg',
    testFun: function(){alert("2");}
  }, {
    id: 3,
    name: 'test name',
    lastText: 'detail',
    face: 'img/perry.png',
    testFun: function(){alert("3");}
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
