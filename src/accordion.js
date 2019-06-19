'use strict';

/**
 * @module @10up/Accordion
 *
 * @description
 *
 * Create an accordion UI.
 *
 * @param {string} element Element selector for accordion container.
 * @param {Object} options Object of optional callbacks.
 */
export default class Accordion {

	/**
	 * constructor function
	 * @param element Ojbect
	 * @param options Ojbect
	 */
	constructor( element, options = {} ) {

		// Defaults
		const defaults = {

			// Event callbacks
			onCreate: null,
			onOpen: null,
			onClose: null,
			onToggle: null,
		};

		if ( ! element || 'string' !== typeof element ) {
			console.error( '10up Accordion: No target supplied. A valid target (accordion area) must be used.' ); // eslint-disable-line
			return;
		}

		// Accordion containers
		this.$accordions = document.querySelectorAll( element );

		// Bail out if there's no accordion.
		if ( ! this.$accordions  ) {
			console.error( '10up Accordion: Target not found. A valid target (accordion area) must be used.'  ); // eslint-disable-line
			return;
		}

		document.documentElement.classList.add( 'js' );

		// Settings
		this.settings = Object.assign( {}, defaults, options );

		this.$accordions.forEach( ( accordionArea, index ) => {
			this.setupAccordion( accordionArea, index );
		} );

		/**
		 * Called after the accordion is initialized on page load.
		 * @callback onCreate
		 */
		if ( this.settings.onCreate && 'function' === typeof this.settings.onCreate ) {
			this.settings.onCreate.call();
		}
	}

	/**
	 * Initialize a given accordion area.
	 * Configure accordion properties and set ARIA attributes.
	 *
	 * @param   {element} accordionArea      The accordionArea to scope changes.
	 * @param   {number}  accordionAreaIndex The index of the accordionArea.
	 * @returns {null}
	 */
	setupAccordion( accordionArea, accordionAreaIndex ) {

		const accordionLinks = accordionArea.querySelectorAll( '.accordion-header' );
		const accordionContent = accordionArea.querySelectorAll( '.accordion-content' );

		// Handle keydown event to move between accordion items
		accordionArea.addEventListener( 'keydown', ( event ) => {
			const selectedElement = event.target;
			const key = event.which;
			if( selectedElement.classList.contains( 'accordion-header' ) ) {
				this.accessKeyBindings( accordionLinks, selectedElement, key ,event );
			}
		} );

		// Set ARIA attributes for accordion links
		accordionLinks.forEach( ( accordionLink, index ) => {
			accordionLink.setAttribute( 'id', `tab${accordionAreaIndex}-${index}` );
			accordionLink.setAttribute( 'aria-selected', 'false' );
			accordionLink.setAttribute( 'aria-expanded', 'false' );
			accordionLink.setAttribute( 'aria-controls', `panel${accordionAreaIndex}-${index}` );

			// Handle click event to toggle accordion items
			accordionLink.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				this.toggleAccordionItem( event );
			} );
		} );

		// Set ARIA attributes for accordion content areas
		accordionContent.forEach( ( accordionContent, index ) => {
			accordionContent.setAttribute( 'id', `panel${accordionAreaIndex}-${index}` );
			accordionContent.setAttribute( 'aria-hidden', 'true' );
			accordionContent.setAttribute( 'aria-labelledby', `tab${accordionAreaIndex}-${index}` );
		} );
	}

	/**
	 * Toggles a given accordion item.
	 * Add or remove necessary CSS classes and toggle ARIA attributes.

	 * @param   {Object} event The accordion click event
	 * @returns {null}
	 */
	toggleAccordionItem( event ) {

		const accordionLink = event.target;
		const accordionContent = accordionLink.nextElementSibling;
		const accordionHeading = accordionContent.querySelector( '.accordion-label' );

		// Toggle active class on accordion link and content.
		accordionLink.classList.toggle( 'is-active' );
		accordionContent.classList.toggle( 'is-active' );

		// Set focus on the accordion heading.
		accordionHeading.setAttribute( 'tabindex', -1 );
		accordionLink.focus();

		if ( accordionContent.classList.contains( 'is-active' ) ) {
			// Show accordion item
			accordionLink.setAttribute( 'aria-selected', 'true' );
			accordionLink.setAttribute( 'aria-expanded', 'true' );
			accordionContent.setAttribute( 'aria-hidden', 'false' );

			/**
			 * Called when an accordion item is opened.
			 * @callback onOpen
			 */
			if ( this.settings.onOpen && 'function' === typeof this.settings.onOpen ) {
				this.settings.onOpen.call();
			}
		} else {
			// Hide accordion item
			accordionLink.setAttribute( 'aria-selected', 'false' );
			accordionLink.setAttribute( 'aria-expanded', 'false' );
			accordionContent.setAttribute( 'aria-hidden', 'true' );

			/**
			 * Called when an accordion item is closed.
			 * @callback onClose
			 */
			if ( this.settings.onClose && 'function' === typeof this.settings.onClose ) {
				this.settings.onClose.call();
			}
		}

		/**
		 * Called when an accordion item is toggled.
		 * @callback onToggle
		 */
		if ( this.settings.onToggle && 'function' === typeof this.settings.onToggle ) {
			this.settings.onToggle.call();
		}
	}

	/**
	 * Moves and focus between items based on the selected item and the key pressed.

	 * @param   {element[]} accordionLinks The array of accordion links.
	 * @param	{element} selectedElement The accordion link where the key action triggers.
	 * @param	{number} key The key code of the key pressed.
	 * @param	{Object} event The accordion keydown event.
	 * @returns {null}
	 */
	accessKeyBindings( accordionLinks, selectedElement, key, event ) {

		let linkIndex;

		accordionLinks.forEach( ( accordionLink, index ) => {
			if ( selectedElement == accordionLink ){
				linkIndex = index;
			}
		} );

		switch ( key ) {
				//End key
				case 35:
					linkIndex = accordionLinks.length-1;
					event.preventDefault();
					break;
				//Home key
				case 36:
					linkIndex = 0;
					event.preventDefault();
					break;
				//Up arrow
				case 38:
					linkIndex--;
					if ( 0 > linkIndex ) {
						linkIndex = accordionLinks.length-1;
					}
					event.preventDefault();
					break;
				//Down arrow
				case 40:
					linkIndex++;
					if ( linkIndex > accordionLinks.length-1 ) {
						linkIndex = 0;
					}
					event.preventDefault();
					break;
		}

		const newLinkIndex = linkIndex;
		accordionLinks[newLinkIndex].focus();
	}
}
