import { select } from 'd3-selection';
import { html as svg } from '@redsift/d3-rs-svg';

import { 
  random as random, 
  contrasts as contrasts, 
  presentation10 as presentation10,
  display as display
} from '@redsift/d3-rs-theme';

const DEFAULT_SIZE = 256;
const DEFAULT_FONT = 200;

function sizeFor(val) {
  return Math.round((DEFAULT_FONT / DEFAULT_SIZE ) * val);  
}

export default function text(id) {
  var classed = 'text-icon', 
      background = null,
      foreground = null,
      fontSize = DEFAULT_FONT,
      width = DEFAULT_SIZE,
      height = null,
      style = "@import url(https://fonts.googleapis.com/css?family=Electrolize); text{ font-family: Electrolize }",
      scale = 1.0,
      text = (d) => d;
  
  let colors = random(presentation10.standard.filter((e, i) => i !== presentation10.names.grey));
  
  function _impl(context) {
    var selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);
            
    selection.each(function() {
      var node = select(this);  
      var h = height || width;
   
      var root = svg(id).width(width).height(h).scale(scale).margin(0).style(style);
      var tnode = node;
      if (transition === true) {
        tnode = node.transition(context);
      }
      tnode.call(root);
      
      var elmS = node.select(root.child());
      
      // data is from the upstream bind
      var elmR = elmS.selectAll('rect').data((d) => (d == null) ? [ '' ] : d); // rect on no data
      elmR.exit().remove();
      elmR = elmR.enter()
              .append('rect')
                .attr('x', 0)
                .attr('y', 0)
              .merge(elmR);      
      
      var elmT = elmS.selectAll('text').data((d) => (d == null) ? [] : d); // no text on no data
      elmT.exit().remove();
      elmT = elmT.enter()
              .append('text')
                .attr('x', '50%')
                .attr('y', '50%')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
              .merge(elmT);
  
      elmT.text(text);
      
      if (transition === true) {
        elmR = elmR.transition(context);
        elmT = elmT.transition(context);
      }  

       elmR.attr('fill', (d) => background || colors(d))
          .attr('width', width)
          .attr('height', h);      
             
      elmT.attr('fill', (d) => {
            if (foreground != null) return foreground;
            if (background != null) return contrasts.white(background) ? display.text.white : display.text.black;
            
            return contrasts.white(colors(d)) ? display.text.white : display.text.black;
          })
          .attr('font-size', fontSize);  
    });
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
    
  _impl.background = function(value) {
    return arguments.length ? (background = value, _impl) : background;
  };

  _impl.foreground = function(value) {
    return arguments.length ? (foreground = value, _impl) : foreground;
  };
  
  _impl.fontSize = function(value) {
    return arguments.length ? (fontSize = value, _impl) : fontSize;
  };

  _impl.size = function(value) {
    return arguments.length ? (width = value, height = value, fontSize = sizeFor(value) , _impl) : width;
  };
    
  _impl.width = function(value) {
    return arguments.length ? (width = value, _impl) : width;
  };  

  _impl.height = function(value) {
    return arguments.length ? (height = value, _impl) : height;
  }; 

  _impl.scale = function(value) {
    return arguments.length ? (scale = value, _impl) : scale;
  }; 
  
  _impl.style = function(value) {
    return arguments.length ? (style = value, _impl) : style;
  }; 
  
  _impl.text = function(value) {
    return arguments.length ? (text = value, _impl) : text;
  }; 
          
  return _impl;
}