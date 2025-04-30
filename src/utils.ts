/**
 * @see https://github.com/i18n-components/i18n-components/blob/main/packages/input-number/src/helpers.ts#L2
 */

/** set the caret positon in an input field */
export function setCaretPosition(el: HTMLInputElement, caretPos = 0): boolean {
	if (el === null) {
		return false;
	}

	// Deselect any selected text
	el.select();
	el.setSelectionRange(0, 0);

	if (el.selectionStart || el.selectionStart === 0) {
		el.focus();
		el.setSelectionRange(caretPos, caretPos);
		return true;
	}

	// fail city, fortunately this never happens (as far as I've tested) :)
	el.focus();
	return false;
}

/**
 * @param  {HTMLInputElement} el
 * @returns number
 */
export function getCurrentCaretPosition(el: HTMLInputElement): number {
	/* Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug */
	const start = el.selectionStart ?? 0;
	const end = el.selectionEnd ?? 0;
	return Math.max(start, end);
}
