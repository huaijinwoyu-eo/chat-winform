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


