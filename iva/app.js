// Define the `myApp` module
var myApp = angular.module("myApp", []);

// Define the `urrListController` controller on the `myApp` module
myApp.controller("ModelController", function listController($scope) {
  $scope.cookiename = "tgdata2xmlc";
  $scope.debugoutinfo = "";

  $scope.appdata={};
  $scope.appdata.mode=1;
  $scope.appdata.csvfile=null;
  $scope.appdata.rawdata=[];
  $scope.appdata.seasonmid={};
  $scope.appdata.seasonkolvo={};
  $scope.appdata.graph={'width': 1900, 'height': 700};
  $scope.appdata.axes="M 0,0 z";
  $scope.appdata.bgraph="M 0,0 z";
  $scope.appdata.rgraph="M 0,0 z";
  $scope.appdata.ggraph="M 0,0 z";

$scope.drawdata=function(){
console.log("app drawdata");
let arrlen=10,arrth=3;
let bx=10;
let by=5;
let s="";
let max=1.0;
let mix=$scope.appdata.rawdata.length;
let miy=0.0;
let may=0.0;
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
if(may<$scope.appdata.rawdata[i].rawvalue){
  may=$scope.appdata.rawdata[i].rawvalue;
}
if(may<$scope.appdata.rawdata[i].forecast){
  may=$scope.appdata.rawdata[i].forecast;
}
}

let dx=(max-mix)/10;
let dy=(may-miy)/10;
let GetMaxY=$scope.appdata.graph.height;
let GetMaxX=$scope.appdata.graph.width;
let cx=(max-mix)/2;
let cy=(may-miy)/2;
let x=bx;
let y=GetMaxY-by;//*(may-cy)/(may-miy);

s+="M "+x.toString(10)+","+y.toString(10)+" ";
x=GetMaxX;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
x-=arrlen;
y-=arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
y+=2*arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
x+=arrlen;
y-=arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";

x=bx;//GetMaxX*(cx-mix)/(max-mix);
y=GetMaxY-by;
s+="M "+x.toString(10)+","+y.toString(10)+" ";
y=by;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
x-=arrth;
y+=arrlen;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
x+=2*arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
x-=arrth;
y-=arrlen;
s+="L "+x.toString(10)+","+y.toString(10)+" ";


for (var i = 1; i < 10; i++) {
x=bx;
y=GetMaxY-by-i*(GetMaxY-by)/10;
s+="M "+x.toString(10)+","+y.toString(10)+" ";
x+=3*arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
}

for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
x=bx+i*(GetMaxX-bx)/$scope.appdata.rawdata.length;
y=GetMaxY-by;
s+="M "+x.toString(10)+","+y.toString(10)+" ";
y-=2*arrth;
s+="L "+x.toString(10)+","+y.toString(10)+" ";
}

s+="z";
$scope.appdata.axes=s;

s="";
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
x=bx+i*(GetMaxX-bx)/$scope.appdata.rawdata.length;
y=GetMaxY-by-$scope.appdata.rawdata[i].rawvalue*(GetMaxY-by)/may;
if(i==0){
s+="M "+x.toString(10)+","+y.toString(10)+" ";
}else{
s+="L "+x.toString(10)+","+y.toString(10)+" ";
}
}
x=bx;
y=GetMaxY-by-$scope.appdata.rawdata[0].rawvalue*(GetMaxY-by)/may;
s+="M "+x.toString(10)+","+y.toString(10)+" ";
s+="z";
$scope.appdata.bgraph=s;

s="";
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
x=bx+i*(GetMaxX-bx)/$scope.appdata.rawdata.length;
y=GetMaxY-by-$scope.appdata.rawdata[i].forecast*(GetMaxY-by)/may;
if(i==0){
s+="M "+x.toString(10)+","+y.toString(10)+" ";
}else{
s+="L "+x.toString(10)+","+y.toString(10)+" ";
}
}
x=bx;
y=GetMaxY-by-$scope.appdata.rawdata[0].forecast*(GetMaxY-by)/may;
s+="M "+x.toString(10)+","+y.toString(10)+" ";
s+="z";
$scope.appdata.rgraph=s;

};

$scope.procdata=function(){

let s=0.0;
if($scope.appdata.rawdata.length>52){
for (var i = 26; i < $scope.appdata.rawdata.length-26; i++) {
s=($scope.appdata.rawdata[i-26].rawvalue+$scope.appdata.rawdata[i+26].rawvalue)/2.0;
for (var j = i-25; j < i+26; j++) {
s+=$scope.appdata.rawdata[j].rawvalue;
  }//j
$scope.appdata.rawdata[i].slmid=s/52.0;
$scope.appdata.rawdata[i].seasonk=$scope.appdata.rawdata[i].rawvalue/$scope.appdata.rawdata[i].slmid;
$scope.appdata.rawdata[i].seasonrise=$scope.appdata.rawdata[i].rawvalue-$scope.appdata.rawdata[i].slmid;
let weeknum=$scope.appdata.rawdata[i].period.slice(4);

if($scope.appdata.seasonmid[weeknum]){
$scope.appdata.seasonmid[weeknum]+=$scope.appdata.rawdata[i].seasonk;
$scope.appdata.seasonkolvo[weeknum]+=1;
}else{
$scope.appdata.seasonmid[weeknum]=$scope.appdata.rawdata[i].seasonk;
$scope.appdata.seasonkolvo[weeknum]=1;
}

}//i
s=0;
for (let w in $scope.appdata.seasonmid) {
  $scope.appdata.seasonmid[w]=$scope.appdata.seasonmid[w]/$scope.appdata.seasonkolvo[w];
  s+=$scope.appdata.seasonmid[w];
}
s=s/52;
for (let w in $scope.appdata.seasonmid) {
  $scope.appdata.seasonmid[w]=$scope.appdata.seasonmid[w]/s;
}
//console.log(s,$scope.appdata.seasonmid,$scope.appdata.seasonkolvo);
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
let weeknum=$scope.appdata.rawdata[i].period.slice(4);
$scope.appdata.rawdata[i].noseasonraw=$scope.appdata.rawdata[i].rawvalue/$scope.appdata.seasonmid[weeknum];
}
let a11=0.0;
let a12=0.0;
let y1=0.0;
let y2=0.0;
let n=$scope.appdata.rawdata.length;
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
a11+=(1+i)*(1+i);
a12+=(1+i);
y1+=(1+i)*$scope.appdata.rawdata[i].noseasonraw;
y2+=$scope.appdata.rawdata[i].noseasonraw;
}
let d=n*a11-a12*a12;
let a=(n*y1-a12*y2)/d;
let b=(a11*y2-a12*y1)/d;
for (var i = 0; i < $scope.appdata.rawdata.length; i++) {
  $scope.appdata.rawdata[i].trend=a*(i+1)+b;
let weeknum=$scope.appdata.rawdata[i].period.slice(4);
$scope.appdata.rawdata[i].forecast=$scope.appdata.rawdata[i].trend*$scope.appdata.seasonmid[weeknum];
}





$scope.drawdata();
}//$scope.appdata.rawdata.length>52
};

$scope.btnclick=function(){
//console.log("app btnclick");
//console.log($scope.appdata.csvfile);
if($scope.appdata.csvfile){

let rows=$scope.appdata.csvfile.split("\r\n");
if(rows.length>0){}
$scope.appdata.rawdata=[];
for (var i = 0; i < rows.length; i++) {
  let onerow=rows[i].split(",");
  //console.log(onerow[1]);
  let val=parseFloat(onerow[2]);
  if(/\d{6}/ig.test(onerow[1]) && !isNaN(val)){
    $scope.appdata.rawdata.push({
period:onerow[1],
rawvalue:val,
slmid:null,
seasonk:null,
seasonrise:null,
noseasonraw:null,
trend:null,
forecast:null});
  }
}
$scope.procdata();
$scope.appdata.mode=2;
}

};



$scope.init=function(){
console.log("app started");
$("datafile").value="";
};


$scope.init();


});

myApp.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function () {
                scope.fileReader = contents;
              });
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});


