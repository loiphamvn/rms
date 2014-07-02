angular.module('common.api', [
    'restangular'
  ])

  .factory('CommonApi', function (Restangular) {
    //Set default for restangular
    Restangular.setBaseUrl('../server/public');
    Restangular.setFullResponse(true);

    var service = {
      all: function (resource, queryParams) {
        if (typeof queryParams === undefined) {
          return Restangular.all(resource).getList();
        } else {
          return Restangular.all(resource).getList(queryParams);
        }
      },

      findAll: function (resource) {
        return Restangular.all(resource);
      },

      find: function (resource, id) {
        return Restangular.one(resource, id);
      },

      post: function (resource, data) {
        if (typeof data === undefined) {
          data = {};
        }
        return Restangular.all(resource).post(data);
      },

      customGET: function (resource, query) {
        return Restangular.all(resource).customGET('', query);
      }
    };

    return service;
  }
);