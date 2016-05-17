import { select } from 'd3-selection';
import { svg } from '@redsift/d3-rs-svg';

export default function text(id) {
  var classed = 'text-icon', 
      background = '#000000',
      foreground = '#FFFFFF',
      fontSize = 128,
      width = 200,
      height = 200;

  function _impl(context) {
    var selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);
        
    selection.each(function(data) {

      var node = select(this); 
      
      var elmS = node.selectAll('svg').data([ data ]);
      elmS.exit().remove();
      elmS = elmS.enter()
              .append('svg')
                .attr('width', width)
                .attr('height', height)              
              .merge(elmS);
      
      
      var elmR = elmS.selectAll('rect').data((d) => d);
      elmR.exit().remove();
      elmR = elmR.enter()
              .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height)
              .merge(elmR);      
      
      var elmT = elmS.selectAll('text').data((d) => d);
      elmT.exit().remove();
      elmT = elmT.enter()
              .append('text')
                .attr('x', '50%')
                .attr('y', '50%')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                .attr('font-family', '\'Electrolize\', sans-serif')
              .merge(elmT);
      
      elmT.text((d) => d);
      
      if (transition === true) {
        elmR = elmR.transition(context);
        elmT = elmT.transition(context);
      }  

      elmR.attr('fill', background);         
      elmT.attr('fill', foreground).attr('font-size', fontSize);  
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
  
  _impl.width = function(value) {
    return arguments.length ? (width = value, _impl) : width;
  };  
  
  _impl.height = function(value) {
    return arguments.length ? (height = value, _impl) : height;
  }; 
        
  return _impl;
}