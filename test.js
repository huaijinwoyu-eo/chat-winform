function stack() {
    this.data = [];
    this.top = 0;
    this.push = function (element) {
        this.data[this.top++] = element;
    };
    this.pop = function () {
        return this.data[--this.top];
    };
    this.peek = function () {
        return this.data[this.top-1];
    };
    this.length = function () {
        return this.top;
    };
    this.clear = function () {
        this.top = 0;
    }
}
var arr = new stack();
arr.push("钱穆");
var temp = arr.pop();
console.log(temp);


console.log(Array.prototype.slice.call(['a','b','/images/abc.png']));
console.log(["a","b","/images/abc.png"].toString().split(","));
console.log(typeof JSON.parse(JSON.stringify(['a','b','c'])));