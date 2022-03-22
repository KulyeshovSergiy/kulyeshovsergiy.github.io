// Define the `myApp` module
var myApp = angular.module("myApp", []);

// Define the `urrListController` controller on the `myApp` module
myApp.controller("ModelTestAppController", function theNaptarController($scope,$http,$window) {
    $scope.debugoutinfo = "";
    $scope.tf = {};
    $scope.ci = {};
    $scope.ci.reqindata = {};
    $scope.ci.calcResult=null;
    $scope.ci.mode=0;
    $scope.ci.tmp={};
    $scope.ci.cookiename="192_168_2_43_39001_calc_interest";
    $scope.tf.cookiename="192_168_2_43_39001_calculation";
    $scope.tf.reqindata={};
    $scope.tf.tmp={};
    $scope.tf.mode=0;
    $scope.tf.result=null;
    $scope.tf.products=["ANNUITY","ANNUITY_ROS"];
    $scope.tf.codes=["FIRST_CALC","FIRST_CALC_A","SAVE_SUM_REPAYMENT","SAVE_PERIOD_REPAYMENT"];
    $scope.tf.paymentdays=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    $scope.theRound = function(p_val) {
        let res=0.0;
        if(p_val){
            res=Math.round(100*p_val)/100;
        }
        return res;
    }
    $scope.proc_calculation = function() {
        console.log("proc_calculation",$scope.ci.reqindata);
        $scope.tf.result=null;
$http({
  method: "POST",
  //url: "http://192.168.2.43:39001/calc_schedule",
  //url: "http://localhost:8080/calc_schedule",
    url: "https://svc.art-bank.ru/39001/calc_schedule",
headers: {
"Authorization": "Basic dXNlcjpsYXJib3I=",
"Accept": "*/*",
"Content-Type": "application/json"
 },
 data: $scope.tf.reqindata

     }).then(function successCallback(response) {
        console.log("proc_calculation_success",response);
        if(response && response.data){
            $scope.tf.result=response.data;
            let wltval=JSON.stringify($scope.tf.reqindata);
            let wlt=$window.localStorage.setItem($scope.tf.cookiename,wltval);
        }
     },
     function errorCallback(response) {
console.log("proc_calculation_error",response);
  });
    }

    $scope.proc_calc_interest = function() {
        console.log("proc_calc_interest",$scope.ci.reqindata);
        $scope.ci.calcResult=null;
$http({
  method: "POST",
  //url: "http://192.168.2.43:39001/calc_interest",
  //url: "http://localhost:8080/calc_interest",
    url: "https://svc.art-bank.ru/39001/calc_interest",
headers: {
"Authorization": "Basic dXNlcjpsYXJib3I=",
"Accept": "*/*",
"Content-Type": "application/json"
 },
 data: $scope.ci.reqindata

     }).then(function successCallback(response) {
        console.log("proc_calc_interest_success",response);

        if(response && response.data && response.data.calcResult){
            $scope.ci.calcResult=response.data.calcResult;
            let wlcval=JSON.stringify($scope.ci.reqindata);
            let wlc=$window.localStorage.setItem($scope.ci.cookiename,wlcval);
        }
     },
     function errorCallback(response) {
console.log("proc_calc_interest_error",response);
  });
    }

    $scope.date2ISO = function(theDate,theField,theMode) {
        if(theDate && theField && theMode){
            $scope[theMode].reqindata[theField]=theDate.toISOString().substr(0,10);
        }

    }

    $scope.switch2num = function(theVal,theField,theMode) {
        if(theVal){
            $scope[theMode].reqindata[theField]=1;
        }else{
            $scope[theMode].reqindata[theField]=0;
        }

    }

    $scope.init = function() {
        $scope.tf.reqindata={
  "account": "string",
  "code": "FIRST_CALC",
  "endDate": "2024-01-15",
  "interestRateVal": 25,
  "lastInterestPaymentDate": "2022-03-17",
  "paymentDay": "14",
  "paymentSum": 0,
  "productCode": "ANNUITY_ROS",
  "startDate": "2023-01-15",
  "sum": 100000
};
let wlt=$window.localStorage.getItem($scope.tf.cookiename);
if(wlt!=null){
    try{
        let cookieobj=JSON.parse(wlt);
        if(cookieobj && typeof cookieobj==="object"){
            $scope.tf.reqindata=cookieobj;
        }
        }catch(e){}
    }
$scope.tf.tmp.startDateRaw=new Date($scope.tf.reqindata.startDate);
$scope.tf.tmp.endDateRaw=new Date($scope.tf.reqindata.endDate);
$scope.ci.reqindata=
{
  "sumForCalc": 10000,
  "interestRateVal": 20,
  "dateFrom": "2022-06-04",
  "dateTo": "2022-07-04",
  "endOfMonthCalcMark": 0
};
let wlc=$window.localStorage.getItem($scope.ci.cookiename);
if(wlc!=null){
    try{
        let cookieobj=JSON.parse(wlc);
        if(cookieobj && typeof cookieobj==="object"){
            $scope.ci.reqindata=cookieobj;
        }
        }catch(e){}
    }
$scope.ci.tmp.dateFromRaw=new Date($scope.ci.reqindata.dateFrom);
$scope.ci.tmp.dateToRaw=new Date($scope.ci.reqindata.dateTo);
$scope.ci.tmp.endOfMonthCalcMarkRaw=($scope.ci.reqindata.endOfMonthCalcMark==1);

        $scope.tf.mode=1;
        $scope.ci.mode=1;

};

    $scope.init();

});