import puppeteer from 'puppeteer';

const APP = 'https://10up.github.io/component-accordion/demo/';
const width = 1440;
const height = 860;

let page;
let browser;

beforeAll( async () => {

	browser = await puppeteer.launch( {
		headless: true,
	} );

	page = await browser.newPage();

	await page.setViewport( {
		width,
		height
	} );

} );

describe( 'Accessibility Tests', () => {

	test( 'Open and close a panel with the keyboard', async () => {

		// Visit the page in headless Chrome
		await page.goto( APP );

		const buttonSelector = '.accordion-header';

		// Get the target element from the aria-controls on the button itself so it isn't hard coded here
		const targetSelector = await page.evaluate( () => {
			return document.querySelector( '.accordion-header' ).getAttribute( 'aria-controls' );
		} );

		// Open a panel
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( String.fromCharCode(13) );
		await page.waitForSelector( buttonSelector + '[aria-expanded="true"]' );
		await page.waitForSelector( '#' + targetSelector + '[aria-hidden="false"]' );

		// Close a panel
		await page.keyboard.down( 'Shift' );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.up( 'Shift' );
		await page.keyboard.press( String.fromCharCode(13) );
		await page.waitForSelector( buttonSelector + '[aria-expanded="false"]' );
		await page.waitForSelector( '#' + targetSelector + '[aria-hidden="true"]' );

	} );

	test( 'Open and close a panel with a mouse', async () => {

		await page.goto( APP );

		const buttonSelector = '.accordion-header';

		// Get the target element from the aria-controls on the button itself so it isn't hard coded here
		const targetSelector = await page.evaluate( () => {
			return document.querySelector( '.accordion-header' ).getAttribute( 'aria-controls' );
		} );

		// Open
		await page.click(buttonSelector);
		await page.waitForSelector( buttonSelector + '[aria-expanded="true"]' );
		await page.waitForSelector( '#' + targetSelector + '[aria-hidden="false"]' );

		// Close
		await page.click(buttonSelector);
		await page.waitForSelector( buttonSelector + '[aria-expanded="false"]' );
		await page.waitForSelector( '#' + targetSelector + '[aria-hidden="true"]' );

	} );

	test( 'Access panels with arrow keys', async () => {

		await page.goto( APP );
		let tree;

		// Select first element
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'ArrowDown' );
		tree = await page.accessibility.snapshot();

		// The second button should have focus
		await expect(tree.children[1].focused).toBe(true);

		// Select the last item
		await page.focus('.accordion-header:last-of-type');
		await page.keyboard.press( 'ArrowDown' );
		tree = await page.accessibility.snapshot();

		// The first button should have focus
		await expect(tree.children[0].focused).toBe(true);

		// On the first item, hit the up arrow
		await page.keyboard.press( 'ArrowUp' );
		tree = await page.accessibility.snapshot();

		// The last button should have focus
		await expect(tree.children[3].focused).toBe(true);

	} );

} );

afterAll( () => {
	page.waitFor(3000);
	browser.close();

} );
