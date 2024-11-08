import { mergeRefs } from "@react-aria/utils";
import { resolveCurrencyFormat } from "@sumup/intl";
import { type FocusEvent, type FormEvent, type ForwardedRef, forwardRef, useRef } from "react";
import {
	type InputAttributes,
	NumberFormatBase,
	type NumberFormatBaseProps,
	type NumberFormatValues,
	type SourceInfo,
} from "react-number-format";

import { setCaretPosition } from "./utils";

type CurrencyInputProps<BaseType = InputAttributes> = Omit<
	NumberFormatBaseProps<BaseType>,
	"format" | "prefix" | "customInput"
> & {
	locale?: string;
	currency?: string;
	withCurrencySymbol?: boolean;
	customInput?: React.ComponentType<BaseType>;
};

function RenderCurrencyInput<BaseType = InputAttributes>(
	{ locale = "en", currency = "USD", withCurrencySymbol = true, ...props }: CurrencyInputProps<BaseType>,
	forwadedRef: ForwardedRef<HTMLInputElement>,
) {
	const innerRef = useRef<HTMLInputElement>(null);
	const currencyFormat = resolveCurrencyFormat(locale, currency);
	const prefix = currencyFormat?.currencyPosition === "prefix" ? `${currencyFormat.currencySymbol} ` : "";
	const minimumFractionDigits = currencyFormat?.minimumFractionDigits ?? 0;
	const maximumFractionDigits = currencyFormat?.maximumFractionDigits ?? 0;
	const divideBy = 10 ** minimumFractionDigits;

	function format(inputValue: string) {
		let value = 0;
		if (!Number(inputValue)) {
			value = 0;
			// when this happens, we want to position the caret at the end
			// of the input only if the user is on the input
			if (document.activeElement === innerRef.current) {
				innerRef.current?.setSelectionRange(
					inputValue.length + (minimumFractionDigits ?? 0),
					inputValue.length + (minimumFractionDigits ?? 0),
				);

				if (inputValue.length && inputValue.length <= 3) {
					// to avoid the caret jumping around, we want to position it
					// at the end of the input when the user is typing the first
					// numbers
					innerRef.current?.setSelectionRange(
						inputValue.length + (minimumFractionDigits ?? 0),
						inputValue.length + (minimumFractionDigits ?? 0),
					);
				}
			}
		} else {
			value = Number(inputValue);
		}

		const amount = new Intl.NumberFormat(currencyFormat?.locale, {
			style: "currency",
			currency: currencyFormat?.currency,
			currencyDisplay: "code",
			minimumFractionDigits,
			maximumFractionDigits,
		})
			// dynamically divide the value by the minimumFractionDigits
			.format(minimumFractionDigits ? value / divideBy : value)
			.replace(/[a-z]{3}/i, "")
			.trim();

		if (withCurrencySymbol) {
			return `${prefix}${amount}`;
		}

		return `${amount}`;
	}

	function onValueChange(values: NumberFormatValues, sourceInfo: SourceInfo) {
		const val = minimumFractionDigits
			? (Number.parseFloat(values.value) / divideBy).toFixed(minimumFractionDigits)
			: values.value;
		const floatVal = values.floatValue && minimumFractionDigits ? values.floatValue / divideBy : values.floatValue;

		console.info;
		props?.onValueChange?.(
			{
				value: val,
				floatValue: floatVal,
				formattedValue: values.formattedValue,
			},
			sourceInfo,
		);
	}

	function onFocus(event: FocusEvent<HTMLInputElement>) {
		if (innerRef.current) {
			const positionLastDigit = innerRef.current.value.length - prefix.length;
			setCaretPosition(innerRef.current, positionLastDigit + (minimumFractionDigits ?? 0));
		}

		props?.onFocus?.(event);
	}

	// set caret position when the user is typing, but not when the user move the caret
	// with the arrow keys
	function onInput(event: FormEvent<HTMLInputElement>) {
		if (innerRef.current) {
			const positionLastDigit = innerRef.current.value.length - prefix.length;
			setCaretPosition(innerRef.current, positionLastDigit + (minimumFractionDigits ?? 0));
		}

		// @ts-expect-error - onInput is not part of the type
		props?.onInput?.(event);
	}

	return (
		// @ts-expect-error
		<NumberFormatBase
			{...props}
			format={format}
			onFocus={onFocus}
			onInput={onInput}
			onValueChange={onValueChange}
			getInputRef={mergeRefs(innerRef, forwadedRef)}
			prefix={undefined}
			valueIsNumericString={false}
		/>
	);
}

// @ts-expect-error - forwardRef is not part of the type
export const CurrencyInput: <BaseType = InputAttributes>(
	props: CurrencyInputProps<BaseType> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof RenderCurrencyInput<BaseType>> = forwardRef(RenderCurrencyInput);
