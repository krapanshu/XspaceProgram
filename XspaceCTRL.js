
app.controller('XspaceCtrl', ['$scope', 'Xspaceservice',
    function ($scope, Xspaceservice) {
        
        var baseUrl = 'https://api.spaceXdata.com/v3/';
        $scope.DeveloperName = "Krapanshu vaishy";
        $scope.AllData = function () {
            var apiRoute = '' + baseUrl + 'launches/?limit=' + 100;
            var AllData = Xspaceservice.getAll(apiRoute);
            AllData.then(function (response) {
                $scope.AllDataSpaceX = response.data;
                var SpaceX = {};
                $scope.AllSpaceX = [];
                var MissionID = "";
                var LaunchLand = "";
                var SuccessLaunchLand = "";
                for (var i = 0; i < $scope.AllDataSpaceX.length; i++) {
                    if ($scope.AllDataSpaceX[i].mission_id.length != 0) {
                        MissionID = $scope.AllDataSpaceX[i].mission_id;
                    } else {
                        MissionID = null;
                    }
                    LaunchLand = $scope.AllDataSpaceX[i].rocket.first_stage.cores[0];
                    if (LaunchLand == null) {
                        SuccessLaunchLand = null;
                    }
                    else {
                        SuccessLaunchLand = LaunchLand.land_success;
                    }
                   
                    SpaceX = {
                        mission_patch: $scope.AllDataSpaceX[i].links.mission_patch,
                        //RocketID: $scope.AllDataSpaceX[i].rocket.rocket_id,
                        mission_name: $scope.AllDataSpaceX[i].mission_name + ' #' + $scope.AllDataSpaceX[i].flight_number,
                        mission_id: MissionID,
 
                       
                        SuccesLand: SuccessLaunchLand,
                        Launchyear : $scope.AllDataSpaceX[i].launch_year,
                        SuccesLaunch : $scope.AllDataSpaceX[i].launch_success
                        
                    };
                    $scope.AllSpaceX.push(SpaceX);
                }
                console.log($scope.AllSpaceX);
                console.log($scope.AllDataSpaceX);
            }, function (error) {
                console.log("Error: " + error);
            });
        }
        $scope.AllData();

        $scope.Even = [
            { Evenyear: '2006' },
            { Evenyear: '2008' },
            { Evenyear: '2010' },
            { Evenyear: '2012' },
            { Evenyear: '2014' },
            { Evenyear: '2016' },
            { Evenyear: '2018' },
            { Evenyear: '2020' }
        ];
        $scope.Odd = [
            { Oddyear: '2007' },
            { Oddyear: '2009' },
            { Oddyear: '2011' },
            { Oddyear: '2013' },
            { Oddyear: '2015' },
            { Oddyear: '2017' },
            { Oddyear: '2019' }
        ];
        var succLaunchtext = "";
        var LaunchSuccess = "";
        var LandSuccess = "";
        var Launchyear = "";
        $scope.SuccessLaunch = function (sla) {
            $scope[evencls] = "";
            $scope.landclsfalse = "";
            $scope.landclstrue = "";
            if (sla == 1) {
                LaunchSuccess = true;
                $scope.launchclsfalse = "";
                $scope.launchclstrue = "Colorchange";
            }
            else {
                LaunchSuccess = false;
                $scope.launchclstrue = "";
                $scope.launchclsfalse = "Colorchange";
                
            }
            evencls = "";
            
            LandSuccess = "";
            Launchyear = "";
            succLaunchtext = "LaunchSuccess";
            $scope.AllDataWithFilter(succLaunchtext, LaunchSuccess, LandSuccess, Launchyear);
        };

        $scope.SuccessLand = function (slu) {
            $scope[evencls] = "";
            $scope.launchclstrue = "";
            $scope.launchclsfalse = "";
            if (slu == 1) {
                LandSuccess = true;  
                $scope.landclsfalse = "";
                $scope.landclstrue = "Colorchange";
            }
            else {
                LandSuccess = false; 
                $scope.landclstrue = "";
                $scope.landclsfalse = "Colorchange";
            }
            LaunchSuccess = true;
            Launchyear = "";
            succLaunchtext = "LandSuccess";
            $scope.AllDataWithFilter(succLaunchtext, LaunchSuccess, LandSuccess, Launchyear);
        };
        $scope.Limit = 100;
       // $scope.evencolor = '';
        var evencls = "";
        $scope.Evenyr = function (data) {
            $scope[evencls] = "";
            $scope.launchclstrue = "";
            $scope.launchclsfalse = "";
            $scope.landclstrue = "";
            $scope.landclsfalse = "";

            evencls = 'evencls' + data;
            $scope[evencls] = "Colorchange";
            LandSuccess = true;
            LaunchSuccess = true;
            Launchyear = data;
            succLaunchtext = "Launchyear";
            $scope.AllDataWithFilter(succLaunchtext, LaunchSuccess, LandSuccess, Launchyear);
        };

        $scope.Oddyr = function (data) {
            $scope[evencls] = "";
            $scope.launchclstrue = "";
            $scope.launchclsfalse = "";
            $scope.landclstrue = "";
            $scope.landclsfalse = "";
            evencls = 'evencls' + data;
            $scope[evencls] = "Colorchange";
            LandSuccess = true;
            LaunchSuccess = true;
            Launchyear = data;
            succLaunchtext = "Launchyear";
            $scope.AllDataWithFilter(succLaunchtext, LaunchSuccess, LandSuccess, Launchyear);
        };

        var ApiURL = "";

        $scope.AllDataWithFilter = function (Successtext, LaunchSuccess, LandSuccess, Launchyear) {
            var year = Launchyear;
            var Launchsucc = LaunchSuccess;
            var Landsucc = LandSuccess;
            var Limit = $scope.Limit;

            if (Successtext == "LaunchSuccess") {
                ApiURL = '' + baseUrl + 'launches/?limit=' + Limit + '&launch_success=' + Launchsucc;
            }
            else if (Successtext == "LandSuccess") {
                ApiURL = '' + baseUrl + 'launches/?limit=' + Limit + '&launch_success=' + Launchsucc + '&land_success=' + Landsucc;
            }
            else if (Successtext == "Launchyear") {
                ApiURL = '' + baseUrl + 'launches/?limit=' + Limit + '&launch_success=' + Launchsucc + '&land_success=' + Landsucc + '&launch_year=' + year;

            }
            var apiRoute = ApiURL;
            var AllData = Xspaceservice.getAll(apiRoute);
            AllData.then(function (response) {
                $scope.AllDataSpaceX = "";
                $scope.AllDataSpaceX = response.data;
                if ($scope.AllDataSpaceX.length == 0) {
                    $scope.AllDataSpaceX.length = 0;
                }
                else {
                var SpaceX = {};
                $scope.AllSpaceX = [];
                var MissionID = "";
                var LaunchLand = "";
                var SuccessLaunchLand = "";
                for (var i = 0; i < $scope.AllDataSpaceX.length; i++) {
                    if ($scope.AllDataSpaceX[i].mission_id.length != 0) {
                        MissionID = $scope.AllDataSpaceX[i].mission_id;
                    } else {
                        MissionID = null;
                    }
                    LaunchLand = $scope.AllDataSpaceX[i].rocket.first_stage.cores[0];
                    if (LaunchLand == null) {
                        SuccessLaunchLand = null;
                    }
                    else {
                        SuccessLaunchLand = LaunchLand.land_success;
                    }

                    SpaceX = {
                        mission_patch: $scope.AllDataSpaceX[i].links.mission_patch,
                        
                        mission_name: $scope.AllDataSpaceX[i].mission_name + ' #' + $scope.AllDataSpaceX[i].flight_number,

                        mission_id: MissionID,


                        SuccesLand: SuccessLaunchLand,
                        Launchyear: $scope.AllDataSpaceX[i].launch_year,
                        SuccesLaunch: $scope.AllDataSpaceX[i].launch_success

                    };
                    $scope.AllSpaceX.push(SpaceX);
                }
                }
            }, function (error) {
                console.log("Error: " + error);
            });
        };
       
    }

]);  