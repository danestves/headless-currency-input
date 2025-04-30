/**
 * @see https://github.com/i18n-components/i18n-components/blob/main/packages/input-number/src/helpers.ts#L2
 */

/** set the caret positon in an input field */
export function setCaretPosition(el: HTMLInputElement, caretPos = 0): boolean {
	// Deselect any selected text
	el.select();
	el.setSelectionRange(0, 0);

	if (el !== null) {
		if (el.selectionStart || el.selectionStart === 0) {
			el.focus();
			el.setSelectionRange(caretPos, caretPos);
			return true;
		}

		// fail city, fortunately this never happens (as far as I've tested) :)
		el.focus();
		return false;
	}

	return false;
}

/**
 * @param  {HTMLInputElement} el
 * @returns number
 */
export function getCurrentCaretPosition(el: HTMLInputElement): number {
	/* Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug */
	return Math.max(<number>el.selectionStart, <number>el.selectionEnd);
}
