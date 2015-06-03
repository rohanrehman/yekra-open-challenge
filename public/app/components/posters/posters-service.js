angular.module("posters.service", [])
    .value("api_products_url", "https://www.stage.yekra.com/v3/products")
    .service("PostersService", ["$q", "$http","api_products_url",
        function($q, $http, api_posters_url) {
            return {
                getFilms: function () {
                    var deferred = $q.defer();
                    $http.get(api_posters_url).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (result) {
                        deferred.reject(result);
                    });
                    return deferred.promise;
                }

            }
        }]);