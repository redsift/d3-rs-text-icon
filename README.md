# d3-rs-text-icon

`d3-rs-text-icon` easily generate a single character icon.

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-text-icon.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-text-icon)

## Example

[View @redsift/d3-rs-text-icon on Codepen](https://....)

## Usage

### Browser
	
	<script src="//static.redsift.io/reusable/d3-rs-text-icon/latest/d3-rs-text-icon.umd-es2015.min.js"></script>
	<script>
		var text = d3_rs_text_icon.text();
		...
	</script>

### ES6

	import { text } from "@redsift/d3-rs-text-icon";
	let eml = text.html();
	...
	
### Require

	var text = require("@redsift/d3-rs-text-icon");
	var eml = text.text();
	...

### Parameters

|Name|Description|Transition|
|----|-----------|----------|
|classed|SVG custom class|N|