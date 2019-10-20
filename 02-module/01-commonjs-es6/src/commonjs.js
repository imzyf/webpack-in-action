var count = 0;
module.exports = {
    count: count,
    add: function (a, b) {
        count += 1;
        return a + b;
    }
}