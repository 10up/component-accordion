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

		let accordionLinks = accordionArea.querySelectorAll( '.accordion-header' );
		let accordionContent = accordionArea.querySelectorAll( '.accordion-content' );

		// Set ARIA attributes for accordion links
		accordionLinks.forEach( ( accordionLink, index ) => {
			accordionLink.setAttribute( 'id', `tab${accordionAreaIndex}-${index}` );
			accordionLink.setAttribute( 'aria-selected', 'false' );
			accordionLink.setAttribute( 'aria-expanded', 'false' );
			accordionLink.setAttribute( 'aria-controls', `panel${accordionAreaIndex}-${index}` );
			accordionLink.setAttribute( 'role', 'tab' );

			// Handle click event to toggle accordion items
			accordionLink.addEventListener( 'click', () => {
				event.preventDefault();
				this.toggleAccordionItem( event );
			} );
		} );

		// Set ARIA attributes for accordion content areas
		accordionContent.forEach( ( accordionContent, index ) => {
			accordionContent.setAttribute( 'id', `panel${accordionAreaIndex}-${index}` );
			accordionContent.setAttribute( 'aria-hidden', 'true' );
			accordionContent.setAttribute( 'aria-labelledby', `tab${accordionAreaIndex}-${index}` );
			accordionContent.setAttribute( 'role', 'tabpanel' );
		} );
	}

	/**
	 * Toggles a given accordion item.
	 * Add or remove necessary CSS classes and toggle ARIA attributes.

	 * @param   {Object} event The accordion click event
	 * @returns {null}
	 */
	toggleAccordionItem( event ) {

		let accordionLink = event.target;
		let accordionContent = accordionLink.nextElementSibling;
		let accordionHeading = accordionContent.querySelector( '.accordion-label' );

		// Toggle active class on accordion link and content.
		accordionLink.classList.toggle( 'is-active' );
		accordionContent.classList.toggle( 'is-active' );

		// Set focus on the accordion heading.
		accordionHeading.setAttribute( 'tabindex', -1 );
		accordionHeading.focus();

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
}

