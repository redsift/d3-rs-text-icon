var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    d3 = require("d3-selection"),
    icon = require("../");

//     svg = require("@redsift/d3-rs-svg"),

tape("html() generates and updates svg", function(t) {
    var data = 'A';
    
    var host = icon.html();
    var el = d3.select('#test').datum(data);
    
    el.call(host);
    t.equal(el.selectAll('svg').size(), 1);    
    
    t.equal(el.select('g').text(), data);

    el.call(host);
    t.equal(el.selectAll('svg').size(), 1);    

    t.equal(el.select('g').text(), data);
    
    data = 'B';
    el.datum(data).call(host);
    
    t.equal(el.select('g').text(), data);
    
    t.end();
});   


tape("html() generates and updates 2 svgs", function(t) {
    var data = 'A';
    
    var one = icon.html('id-1');
    var two = icon.html('id-2');
    
    var el = d3.select('#test').datum(data);
    
    el.call(one);
    el.call(two);
    
    t.equal(el.selectAll('svg').size(), 2);    
    t.end();
}); 