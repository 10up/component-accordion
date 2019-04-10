/* global require, process */

'use strict';

const pa11y = require( 'pa11y' );
const chalk = require( 'chalk' );
const packageJson = require( '../../package.json' );
const testingDemo = packageJson.testing.file;

// Only proceed if there is a designated file to run against.
if ( ! testingDemo ) {
	console.log( chalk.red.bold( '✘ Error: Please designate a file to run against in package.json' ) );
	console.log( '' );
	process.exit( 1 );
}

// Set up the pa11y config options
// https://github.com/pa11y/pa11y#configuration
const config = {
	standard: packageJson.testing.accessibility.compliance,
	includeWarnings: true,
	rootElement: 'body',
	threshold: 2,
	timeout: 20000,
	userAgent: 'pa11y',
	width: 1280,
	ignore: [
		'notice'
	],
	log: {
		debug: console.log.bind( console ),
		error: console.error.bind( console ),
		info: console.log.bind( console )
	},
	chromeLaunchConfig: {
		ignoreHTTPSErrors: true
	},
	actions: [
		'click element #tab0-1',
		'screen capture example.png'
	]
};

/**
 * Run Accessibility Test
 * @link https://github.com/pa11y/pa11y#configuration
 * @param {string} testingDemo test document
 * @param {object} config test configuration option
 * @param {Function} [cb] Callback
 * @returns {object} test results
 */
pa11y( testingDemo, config, ( error, results ) => {
	if ( error ) {
		return console.error( error );
	} else if ( results.issues.length ) {
		console.log( results );
	} else {
		console.log( chalk.green.bold( '✔ All accessibility tests have passed.' ) );
	}
} );
