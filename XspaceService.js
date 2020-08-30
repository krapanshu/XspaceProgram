app.service('Xspaceservice', function ($http) {
    var urlGet = '';
 
    this.getAll = function (apiRoute) {
        urlGet = apiRoute;
        return $http.get(urlGet);
    };
        
    this.postordernew = function (apiroute, objorder) {
        var request = $http({
            method: "Post",
            url: apiroute,
            data: objorder
        });
        return request;
    };
        
    this.getbyID = function (apiRoute, CatID) {
        urlGet = apiRoute + '/' + CatID;
        return $http.get(urlGet);
    };
    this.getbyIDCat = function (apiRoute, DishID) {
        urlGet = apiRoute + '?CatID=' + DishID;
        return $http.get(urlGet);
    };
    this.daynumber = function (apiRoute, daynum) {
        urlGet = apiRoute + '?daynum=' + daynum;
        return $http.get(urlGet);
    };



});

