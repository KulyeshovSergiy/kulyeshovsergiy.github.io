// Define the `myApp` module


var myApp = angular.module("myApp", []);

// Define the `urrListController` controller on the `myApp` module
myApp.controller("CurrListController", function currListController($scope,$http,$window) {
  $scope.usdValue = 0;
  $scope.statuscode = null;
  $scope.content = null;
  $scope.thecurr = "";
  $scope.reqrates = null;
  $scope.debugoutinfo = "";
  $scope.currList = ["USD","EUR"];
  $scope.currindex = [0,1];
  $scope.ddwcurr = [];
  $scope.allList = [];
  $scope.currVals = {};
  $scope.lock_val = 0;
  $scope.lock_arr = ["lock","lock_open"];
  $scope.lock_ico = $scope.lock_arr[$scope.lock_val];
  $scope.ccalk=[{autocurr:[],autocurrselpos:null}];
  $scope.cookiename="CurrListControlleriJTQUOhcWr7x9JvoRxT2MZw1T";
  $scope.quickcookiename="CurrPlusValJTQUOhcWr7x9JvoRxT2MZw1T";
  $scope.timestamp=null;

$scope.setCurr = function(theCurr,pos){
//console.log("setCurr",theCurr,pos);
let x = document.getElementsByClassName("autocomplete-active");
for (let i = 0; i < x.length; i++) {
  x[i].classList.remove("autocomplete-active");
}

$scope.ccalk[pos].autocurrselpos = null;
$scope.ccalk[pos].autocurr= [];
$scope.currList[pos]=theCurr;
};

$scope.procAutoKey = function(kev,pos){
//console.log("procAutoKey",kev,pos,$scope.ccalk[pos].autocurrselpos,$scope.currList[pos]);
let x;
if(!(kev.key==undefined)){
if($scope.ccalk[pos].autocurr.length>0){
    if($scope.ccalk[pos].autocurrselpos ==null){
    if(kev.key=="ArrowDown"){
        $scope.ccalk[pos].autocurrselpos = 0;
       // $scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="autocomplete-active";
        x = document.getElementsByClassName("ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos);
        for (let i = 0; i < x.length; i++) {
              x[i].classList.add("autocomplete-active");
            }

    }
    }else{
      $scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="";
      if(kev.key=="ArrowDown"){
        //$scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="autocomplete-items";
        x = document.getElementsByClassName("ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos);
        for (let i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
        if($scope.ccalk[pos].autocurrselpos<$scope.ccalk[pos].autocurr.length-1){
            $scope.ccalk[pos].autocurrselpos++;
        }else{
            $scope.ccalk[pos].autocurrselpos = 0;
        }
        //$scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="autocomplete-active";
        x = document.getElementsByClassName("ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos);
        for (let i = 0; i < x.length; i++) {
              x[i].classList.add("autocomplete-active");
            }
      }
      if(kev.key=="ArrowUp"){
        //$scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="autocomplete-items";
        x = document.getElementsByClassName("ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos);
        for (let i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
        if($scope.ccalk[pos].autocurrselpos>0){
             $scope.ccalk[pos].autocurrselpos--;
        }else{
            $scope.ccalk[pos].autocurrselpos = $scope.ccalk[pos].autocurr.length-1;
        }
        //$scope["ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos]="autocomplete-active";
        x = document.getElementsByClassName("ali"+pos+"_"+$scope.ccalk[pos].autocurrselpos);
        for (let i = 0; i < x.length; i++) {
              x[i].classList.add("autocomplete-active");
            }
      }
      if(kev.key=="Enter"){
        $scope.setCurr($scope.ccalk[pos].autocurr[$scope.ccalk[pos].autocurrselpos],pos);
      }
      if(kev.key.length==1){
        $scope.ccalk[pos].autocurrselpos = null;
      }
    }

}else{

    $scope.procCurr(pos,$scope.currList[pos]+".*");
   }
}

};

$scope.procCurr = function(pos,ev){
//console.log("procCurr",pos,ev);
let x = document.getElementsByClassName("autocomplete-active");
for (let i = 0; i < x.length; i++) {
  x[i].classList.remove("autocomplete-active");
}
$scope.ccalk[pos].autocurr= [];
$scope.ccalk[pos].autocurrselpos = null;
if($scope.allList.length>0){
var re=new RegExp("^"+ev,"i");

for (var i = 0; i < $scope.allList.length; i++) {
if( re.test($scope.allList[i].symbol) ){
$scope.ccalk[pos].autocurr.push($scope.allList[i].symbol);
$scope["ali"+i]="";
//if($scope.ccalk.autocurr.length>9){
//    break;
//}
}
}
}
//for (var i = 0; i < $scope.ccalk[pos].autocurr.length; i++) {
//$scope["ali"+pos+"_"+i]="autocomplete-items";
//}

};


$scope.delRow = function(){
    if($scope.currList.length>1){
        $scope.currList.pop();
        $scope.currindex.pop();
        $scope.ccalk.pop();
    }
};
$scope.addRow = function(){
    $scope.currList.push("");
    $scope.currindex.push($scope.currindex.length);
    $scope.ccalk.push({autocurr:[],autocurrselpos:null});
};


$scope.claarCurrListEmptyRows = function(){
    for(let i=$scope.currList.length-1;i>0;i--){
        if($scope.currList[i]==null){
            $scope.currList.splice(i,1);
            $scope.currindex.pop();
            $scope.ccalk.pop();
        }
    }
};

$scope.saveCurVal = function(theCurr,theVal){
    let wlcval=JSON.stringify({Curr:theCurr,Val:theVal});
    let wlc=$window.localStorage.setItem($scope.quickcookiename,wlcval);
};

$scope.loadCurVal = function(){
    let wlc=$window.localStorage.getItem($scope.quickcookiename);

if(wlc!=null){
        try{
        let cookieobj=JSON.parse(wlc);

if(cookieobj.Curr!=null){


if(cookieobj.Val!=null){

        for(var i=0;i<$scope.allList.length;i++){
            if($scope.allList[i].symbol==cookieobj.Curr){
                $scope.usdValue=cookieobj.Val/$scope.allList[i].price;
                break;
            }
        }
        /*for(var i=0;i<$scope.allList.length;i++){
            if($scope.allList[i].symbol!=theCurr){
            $scope.allList[i].value=$scope.usdValue*$scope.allList[i].price;
            }
        }*/
}
}
}catch(e){}
}
};


$scope.saveDef = function(){
    let wlcval=JSON.stringify({currList:$scope.currList,allList:$scope.allList,timestamp:$scope.timestamp});
    let wlc=$window.localStorage.setItem($scope.cookiename,wlcval);
};

$scope.loadDef = function(){
let wlc=$window.localStorage.getItem($scope.cookiename);
if(wlc!=null){
    try{
        let cookieobj=JSON.parse(wlc);
        if(cookieobj && typeof cookieobj==="object"){
        if(cookieobj.timestamp){
            $scope.timestamp=cookieobj.timestamp;
        }
        if(cookieobj.allList && angular.isArray(cookieobj.allList)){
            $scope.allList=cookieobj.allList;
            $scope.ddwcurr=[];
            for(let i=0;i<$scope.allList.length;i++){
            $scope.ddwcurr.push($scope.allList[i].symbol);
            }
            $scope.ddwcurr.sort();
            $window.allcurr = $scope.ddwcurr;
        }
        if(cookieobj.currList && angular.isArray(cookieobj.currList)){
            $scope.currList=cookieobj.currList;
            $scope.currindex=[];
            $scope.ccalk=[];
            for(let i=0;i<$scope.currList.length;i++){
            $scope.currindex.push(i);
            $scope.ccalk.push({autocurr:[],autocurrselpos:null});
            }
        }

        }
        }catch(e){}
    }
};

$scope.procLock = function(){
$scope.lock_val = 1-$scope.lock_val;
$scope.lock_ico = $scope.lock_arr[$scope.lock_val];
if($scope.lock_val == 0){
$scope.claarCurrListEmptyRows();
$scope.saveDef();
}
};

$scope.mytestfunct = function(onecurr,newval){
	$scope.debugoutinfo = "Is: "+onecurr+ " - " + newval;
};

$scope.refreshData = function(){
$http({
  method: "GET",
  //url: "http://api.fixer.io/latest?base=USD"
  url: "https://openexchangerates.org/api/latest.json?app_id=42f2e9022e464f518c760625a868d0a6"
  //url: "http://apilayer.net/api/live?access_key=d80f05a8b47b13b6969cf81b9bb77077"
  //url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDUSD%22,%22USDEUR%22,%22USDHUF%22,%22USDUAH%22,%22USDRUB%22,%22USDKZT%22,%22USDJPY%22,%22USDGBP%22)&env=store://datatables.org/alltableswithkeys&format=json"
     }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.statuscode = response.status;
//console.log("refreshData",response.data.rates);
    //$scope.content = response.data.query.results;
//  $scope.reqrates = response.data.rates;
    $scope.reqrates = response.data.rates;
$scope.allList=[];
$scope.ddwcurr=[];
for(let item in response.data.rates){
//  console.log(item,response.data.rates[item]);
$scope.allList.push({symbol:item+"",price:response.data.rates[item]});
$scope.ddwcurr.push(item+"");
}
$scope.ddwcurr.sort();
$window.allcurr = $scope.ddwcurr;
$scope.saveDef();
    //$scope.debugoutinfo = response.data.quotes;
    //for(var i=0;i<$scope.reqrates.length;i++){
    //  $scope.addCurrList($scope.reqrates[i].Name,$scope.reqrates[i].Rate,$scope.reqrates[i].Name.slice(-3));
    //}
  /*  $scope.currList.push("USD");
    $scope.currList.push("EUR");
    $scope.currList.push("HUF");
    $scope.currList.push("UAH");
    $scope.currList.push("RUB");
    $scope.currList.push("KZT");
    $scope.currList.push("JPY");
    $scope.currList.push("GBP");
    $scope.currList.push("UZS");*/

/*    $scope.currList.push({value: 0,symbol: "USD"});
    $scope.currList.push({value: 0,symbol: "EUR"});
    $scope.currList.push({value: 0,symbol: "HUF"});
    $scope.currList.push({value: 0,symbol: "UAH"});
    $scope.currList.push({value: 0,symbol: "RUB"});
    $scope.currList.push({value: 0,symbol: "KZT"});
    $scope.currList.push({value: 0,symbol: "JPY"});
    $scope.currList.push({value: 0,symbol: "GBP"});
    $scope.currList.push({value: 0,symbol: "UZS"});*/

    $scope.config = response.config;
    //var zzz=$window.confirm("EUR: "+$scope.reqrates["EUR"]);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    $scope.debugoutinfo = "response.status: " + response.status;
  });
};

$scope.init = function(){
//console.log("init",$window);
$scope.loadDef();
//console.log("init",$scope.ddwcurr,$scope.allList);

let dnow = (new Date())-1;
if(Math.round((dnow-$scope.timestamp)/1000/60/60)>6 || $scope.ddwcurr[0]==$scope.ddwcurr[1]){
  $scope.timestamp=dnow;
  $scope.refreshData();
}
$scope.loadCurVal();
};

$scope.init();



$scope.setAllValues = function(theCurr,theVal){
$scope.saveCurVal(theCurr,theVal);
		for(var i=0;i<$scope.allList.length;i++){
			if($scope.allList[i].symbol==theCurr){
				//$scope.allList[i].value=theVal;
			    $scope.usdValue=theVal/$scope.allList[i].price;
			    break;
			}
		}
		/*for(var i=0;i<$scope.allList.length;i++){
			if($scope.allList[i].symbol!=theCurr){
			$scope.allList[i].value=$scope.usdValue*$scope.allList[i].price;
			}
		}*/
		return;
	};

    $scope.getCurrValue = function(theCurr){
		var ret=0;
		for(var i=0;i<$scope.allList.length;i++){
			if($scope.allList[i].symbol==theCurr){
			ret=Math.round(100*$scope.usdValue*$scope.allList[i].price)/100;
			break;
			}
		}
		return ret;
	};

    $scope.getCurrListLen = function(){
		return $scope.currList.length;
	};

});



