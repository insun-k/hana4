let i = 1;
console.log("x=", x);
var x = 1;
console.log(ff, f);
{
  f();
  var x = 2;
  function f() {
    console.log("f>", x, xx);
  }
}
function ff() {
  console.log("ff>", y, yy);
}
if (x >= 2) {
  var y = 5;
  let yy = 55;
}
var xx = 100;

ff();
