# 10up Accordion component

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level)

[![Build Status][cli-img]][cli-url]
[cli-img]: https://travis-ci.org/10up/component-accordion.svg?branch=master
[cli-url]: https://travis-ci.org/10up/component-accordion

The most important thing to remember when implementing this accordion is that the trigger (the element you click to open a drawer) needs to be a focusable element. In this case, we’re using a button and applying all the ARIA attributes with JavaScript. If JavaScript isn’t enabled, each drawer will be in its natural open state.

## Installation

### NPM
`npm install --save @10up/component-accordion`

### Standalone
Clone this repo and import `accordion.js` and `accordion.css` from the `dist/` directory.

## API

This component accepts two arguments, the selector for the accordion container and an object containing optional callbacks.

### Callbacks

- `onCreate`: Called after the accordion is initialized on page load
- `onOpen`: Called when an accordion item is opened
- `onClose`: Called when an accordion item is closed
- `onToggle`: Called when an accordion item is toggled

## Usage

### Markup

This is the markup template expected by the component.

```html
<div class="accordion">
	<button class="accordion-header" type="button">Accordion Header</button>
	<div class="accordion-content">
		<h2 class="accordion-label">Accordion Heading</h2>
		<p>Here the content of 1st tab.</p>
	</div>
	<button class="accordion-header" type="button">Accordion Header</button>
	<div class="accordion-content">
		<h2 class="accordion-label">Accordion Heading</h2>
		<p>Here the content of 2nd tab.</p>
	</div>
</div>
```

### CSS

The styles can be imported into your existing codebase by using PostCSS imports, or by including the standalone CSS file in your project.

#### PostCSS Imports
`@import '@10up/component-accordion';`

#### Standalone
Include the `accordion.css` file from the `dist/` directory.

### JavaScript

Create a new instance by supplying the selector to use for the accordion and an object containing any necessary callback functions.

#### NPM

```javascript
import Accordion from '@10up/component-accordion';

new Accordion( '.accordion', {
	onCreate: function() {
		console.log( 'onCreate callback' );
	},
	onOpen: function() {
		console.log( 'onOpen callback' );
	},
	onClose: function() {
		console.log( 'onClose callback' );
	},
	onToggle: function() {
		console.log( 'onToggle callback' );
	}
} );
```

#### Standalone

Include the `accordion.js` file from the `dist/` directory and access the component from the gobal `TenUp` object.

```javascript
let myAccordion = new TenUp.accordion( '.accordion', {
	onCreate: function() {
		console.log( 'onCreate callback' );
	},
	onOpen: function() {
		console.log( 'onOpen callback' );
	},
	onClose: function() {
		console.log( 'onClose callback' );
	},
	onToggle: function() {
		console.log( 'onToggle callback' );
	}
} );
```

## Demo

Example implementations can be found in the `demo` directory.

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10updotcom-wpengine.s3.amazonaws.com/uploads/2016/10/10up-Github-Banner.png" width="850"></a>
