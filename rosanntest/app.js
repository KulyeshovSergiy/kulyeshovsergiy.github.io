// Define the `myApp` module
var myApp = angular.module("myApp", []);

// Define the `urrListController` controller on the `myApp` module
myApp.controller("ModelTestAppController", function theNaptarController($scope,$http) {
    $scope.debugoutinfo = "";
    $scope.tf = {};
    $scope.ci = {};
    $scope.ci.reqindata = {};
    $scope.ci.calcResult=null;
    $scope.ci.mode=0;
    $scope.ci.tmp={};
    $scope.tf.reqindata={};
    $scope.tf.tmp={};
    $scope.tf.mode=0;
    $scope.tf.result=null;
    $scope.tf.products=["ANNUITY","ANNUITY_ROS"];
    $scope.tf.codes=["FIRST_CALC","FIRST_CALC_A","SAVE_SUM_REPAYMENT","SAVE_PERIOD_REPAYMENT"];
    $scope.tf.paymentdays=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    $scope.theRound = function(p_val) {
        return Math.round(100*p_val)/100;
    }
    $scope.proc_calculation = function() {
        console.log("proc_calculation",$scope.ci.reqindata);
        $scope.tf.result=null;
$http({
  method: "POST",
  url: "http://192.168.2.43:39001/calculation",
  //url: "http://localhost:8080/calculation",
headers: {
"Accept": "*/*",
"Content-Type": "application/json",
"Connection": "keep-alive"
 },
 data: $scope.tf.reqindata

     }).then(function successCallback(response) {
        console.log("proc_calculation_success",response);
        if(response && response.data){
            $scope.tf.result=response.data;
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
  url: "http://192.168.2.43:39001/calc_interest",
  //url: "http://localhost:8080/calc_interest",
headers: {
"Accept": "*/*",
"Content-Type": "application/json",
"Connection": "keep-alive"
 },
 data: $scope.ci.reqindata

     }).then(function successCallback(response) {
        console.log("proc_calc_interest_success",response);
        if(response && response.data && response.data.calcResult){
            $scope.ci.calcResult=response.data.calcResult;
        }
     },
     function errorCallback(response) {
console.log("proc_calc_interest_error",response);
  });
    }

    $scope.date2ISO = function(theDate,theField,theMode) {
$scope[theMode].reqindata[theField]=theDate.toISOString().substr(0,10);
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
$scope.ci.tmp.dateFromRaw=new Date($scope.ci.reqindata.dateFrom);
$scope.ci.tmp.dateToRaw=new Date($scope.ci.reqindata.dateTo);
$scope.ci.tmp.endOfMonthCalcMarkRaw=($scope.ci.reqindata.endOfMonthCalcMark==1);

        $scope.tf.mode=1;
        $scope.ci.mode=1;

/*let re=/\{[^}]+\}/ig;

let arrval= $scope.subjecttemplate.match(re);
let zz=[];
arrval.forEach((item)=>{zz.push(item+"--> orders.[0]["+item.replace(/[{}]/g,"").trim()+"]")});*/
/*while ( (arrval=re.exec($scope.subjecttemplate))!=null){
//zz.push((arrval+"").replace(/[{}]/g,""));
zz.push(arrval);
}*/
//re.exec($scope.subjecttemplate).forEach((item,index,arr)=>{zz.push(item);arr=re.exec($scope.subjecttemplate);});
let zstr="FeeGroupDto(id=SBP_NotAlfa, group=1.2, procId=477, stopMark=0, feeGroupRating=23, stopGroupId=null)";
let vstr=zstr.match(/\((?:[^)]*)\)/ig)[0].replace(/^\(|\)$/ig,"");
let re=/((?:"[^"]*"|[^=,])*)=((?:"[^"]*"|[^=,])*)/g;



$scope.debugoutinfo = vstr.match(re);//.match(re);
};

    $scope.init();

});