angular.module('lshttp', ['ngStorage'])
.config(['$localStorageProvider',function ($localStorageProvider) {
    $localStorageProvider.setKeyPrefix('lshttp_');
}])
.service('$lshttp', ['$q', '$http', '$localStorage', function($q, $http, $localStorage){
  var self = this;
  self.minutes = 10;//default
  self.enabled = true;

  var ls = $localStorage;
  this.get = function(api){
    if(!self.enabled){
      return $http.get(api);
    }
    var partsLink = api.split('/');
    var key = partsLink[partsLink.length - 1];
    var obtained_time = ls[key + "_last_update"];
    var obtained_time_minutes = ( (new Date()).getTime() - obtained_time)  / 1000 / 60;
    // var obtained_time_minutes = moment().diff(moment(obtained_time)) / 1000 / 60;
    console.log(obtained_time_minutes);
    var obtained = ls.key;
    if(!(typeof(obtained_time) === 'null' || typeof(obtained) === 'null') && obtained_time_minutes < self.minutes){
      return $q(function(resolve){
        resolve(obtained);
      });
    }else{
      return $q(function(resolve){
        $http.get(api).then(function(res){
          self.set(key, res);
          resolve(res);
        });
      });
    }
  }

  this.set = function(key, value){
    ls[key + '_last_update'] = (new Date()).getTime();
    ls.key = value;
  }

  this.remove = function(key){
    delete ls.key;
    // ls.removeItem(key);
  }

  this.removeAll = function(){
    ls.$reset();
  }


}])
