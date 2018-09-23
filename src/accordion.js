'use strict';

export default function Accordion ( options, callback ) {

	if ( 'undefined' === typeof options.target ) {
		return false;
	}

	document.documentElement.className += ' js ';

	let accordions = Array.from( document.querySelectorAll( options.target ) );

	if ( ! accordions ) {
		return;
	}

	// Itterate though each accordion
	accordions.forEach( ( accordion, topIndex ) => {
		topIndex = topIndex + 1;

		let accordionContent = Array.from( accordion.getElementsByClassName( 'accordion-content' ) ),
			accordionHeader  = Array.from( accordion.getElementsByClassName( 'accordion-header' ) );

		// Itterate though each accordion header, set attributes, add click handler
		accordionHeader.forEach( ( value, index ) => {
			let head = value;
			index = index + 1;

			// Set ARIA and ID attributes
			head.setAttribute( 'id', 'tab' + topIndex + '-' + index );
			head.setAttribute( 'aria-selected', 'false' );
			head.setAttribute( 'aria-expanded', 'false' );
			head.setAttribute( 'aria-controls', 'panel' + topIndex + '-' + index );
			head.setAttribute( 'role', 'tab' );

			head.addEventListener( 'click', accordionHandle );

			function accordionHandle() {

				let nextPanel = value.nextElementSibling,
					nextPanelLabel = nextPanel.getElementsByClassName( 'accordion-label' )[0];

				value.classList.toggle( 'is-active' );

				nextPanel.classList.toggle( 'is-active' );

				nextPanelLabel.setAttribute( 'tabindex', -1 );
				nextPanelLabel.focus();

				if ( nextPanel.classList.contains( 'is-active' ) ) {
					head.setAttribute( 'aria-selected', 'true' );
					head.setAttribute( 'aria-expanded', 'true' );
					nextPanel.setAttribute( 'aria-hidden', 'false' );
				} else {
					head.setAttribute( 'aria-selected', 'false' );
					head.setAttribute( 'aria-expanded', 'false' );
					nextPanel.setAttribute( 'aria-hidden', 'true' );
				}
			}
		} );

		// Itterate though each accordion content section and set attributes
		accordionContent.forEach( ( value, index ) => {
			let content = value;
			index = index + 1;

			// Set ARIA and ID attributes
			content.setAttribute( 'id', 'panel' + topIndex + '-' + index );
			content.setAttribute( 'aria-hidden', 'true' );
			content.setAttribute( 'aria-labelledby', 'tab' + topIndex + '-' + index );
			content.setAttribute( 'role', 'tabpanel' );
		} );

	} );

	// Execute the callback function
	if ( 'function' === typeof callback ) {
		callback.call();
	}

}
