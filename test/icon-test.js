var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    svg = require("@redsift/d3-rs-svg"),
    d3 = require("d3-selection"),
    text = require("../");

tape("html() generates icon", function(t) {
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());
    var textElm = el.append('text');
    
    textElm.text(lore);

    var wrap = text.text().lineHeight(20).spacing(3);
    textElm.call(wrap);
    
    t.equal(textElm.selectAll('tspan').size(), 1);    
    t.equal(textElm.text(), lore);    

    t.end();
});   
