(function() {
   'use strict';

    angular
        .module('app.posters',[])
        .controller('PostersController', ['PostersService','$q','$http',PostersController]);

    function PostersController(PostersService,$q,$http) {
        var self = this;
            self.data = loadAllFilms();

        function loadAllFilms() {
            var allPosters = PostersService.getFilms().then(function (response) {
                return response;
            });
            return allPosters;
        }


        var posters = this;

        posters.tiles = buildGridModel({
            title: "Title",
            background: "red",
            width:"200px",
            height:"300px",
            id: null,
            isAnimating:false
        });


        function buildGridModel(tileTmpl) {
            console.log('BUILDING');

            var it, results = [];
            self.data.then(function(response){
                for (var j = 0; j < 20; j++) {
                    it = angular.extend({}, tileTmpl);
                    it.id = j;
                   // it.icon = it.icon + (j + 1);
                    it.title = response.data.products[j].title;
                    it.span = {row: "1", col: "1"};
                    it.background = "white";
                    it.span.row = it.span.col = 1;

                    results.push(it);
                }
            });

            return results;
        }


    }


    PostersController.prototype.mouseHndlr = function ($event,item) {
        var card = angular.element($event.target).parent();
        switch($event.type) {
            case "click":
                console.log(card);

                break;
            default:

        }
    };

})();