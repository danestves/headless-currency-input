/**
 * @see https://github.com/i18n-components/i18n-components/blob/main/packages/input-number/src/helpers.ts#L2
 */
export function setCaretPosition(el: HTMLInputElement, caretPos: number): boolean {
	if (el !== null) {
		el.focus();
		el.setSelectionRange(caretPos, caretPos);
		return true;
	}

	return false;
}
