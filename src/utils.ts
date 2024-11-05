/**
 * @see https://github.com/i18n-components/i18n-components/blob/main/packages/input-number/src/helpers.ts#L2
 */
export function setCaretPosition(el: HTMLInputElement, caretPos = 0): boolean {
	// biome-ignore lint/correctness/noSelfAssign: comes from the reference
	el.value = el.value;
	// ^ this is used to not only get "focus", but
	// to make sure we don't have it everything -selected-
	// (it causes an issue in chrome, and having it doesn't hurt any other browser)

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
