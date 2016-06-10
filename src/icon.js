import { select } from 'd3-selection';
import { html as svg } from '@redsift/d3-rs-svg';

import {ColorTools} from '@redsift/ui-rs-core';

export default function text(id) {
  var classed = 'text-icon',
      background = '#000000',
      foreground = '#FFFFFF',
      fontSize = 128,
      width = 200,
      height = 200,
      style = null,
      scale = 1.0,
      text = (d) => d;

  function _impl(context) {
    var selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);

    let theme = ColorTools.randomTheme();
    console.log('theme: ' + theme);

    selection.each(function() {
      var node = select(this);

      var root = svg().width(width).height(height).scale(scale).margin(0).style(style);
      var tnode = node;
      if (transition) {
        tnode = node.transition(context);
      }
      tnode.call(root);

      var elmS = node.select(root.child());

      // data is from the upstream bind
      var elmR = elmS.selectAll('rect').data((d) => d);
      elmR.exit().remove();
      elmR = elmR.enter()
              .append('rect')
                .attr('x', 0)
                .attr('y', 0)
              .merge(elmR);

      var elmT = elmS.selectAll('text').data((d) => d);
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

      elmR.attr('fill', background)
          .attr('width', width)
          .attr('height', height);
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
