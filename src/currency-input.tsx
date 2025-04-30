"use client";

import { mergeRefs } from "@react-aria/utils";
import { resolveCurrencyFormat } from "@sumup/intl";
import { type FormEvent, type ForwardedRef, forwardRef, useRef } from "react";
import {
	type InputAttributes,
	NumberFormatBase,
	type NumberFormatBaseProps,
	type NumberFormatValues,
	type SourceInfo,
} from "react-number-format";

import { getCurrentCaretPosition, setCaretPosition } from "./utils";

type CurrencyInputProps<BaseType = InputAttributes> = Omit<
	NumberFormatBaseProps<BaseType>,
	"format" | "prefix" | "customInput"
> & {
	locale?: string;
	currency?: string;
	withCurrencySymbol?: boolean;
	customInput?: React.ComponentType<BaseType>;
	onInput?: (event: FormEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

function RenderCurrencyInput<BaseType = InputAttributes>(
	props: CurrencyInputProps<BaseType>,
	forwadedRef: ForwardedRef<HTMLInputElement>,
) {
	const innerRef = useRef<HTMLInputElement>(null);
	const { locale = "en", currency = "USD", withCurrencySymbol = false } = props;
	const currencyFormat = resolveCurrencyFormat(locale, currency);
	const prefix = currencyFormat?.currencyPosition === "prefix" ? `${currencyFormat.currencySymbol} ` : "";
	const minimumFractionDigits = currencyFormat?.minimumFractionDigits ?? 0;
	const maximumFractionDigits = currencyFormat?.maximumFractionDigits ?? 0;
	const divideBy = 10 ** minimumFractionDigits;

	function format(inputValue: string) {
		let value = 0;
		if (!Number(inputValue)) {
			value = 0;
		} else {
			value = Number(inputValue);
		}

        if (!innerRef.current) {
            return inputValue;
        }
		const amount = new Intl.NumberFormat(currencyFormat?.locale, {
			style: "currency",
			currency: currencyFormat?.currency,
			currencyDisplay: "code",
			minimumFractionDigits,
			maximumFractionDigits,
		})
			.format(minimumFractionDigits ? value / divideBy : value)
			.replace(/[a-z]{3}/i, "")
			.trim();

		const formattedValue = withCurrencySymbol ? `${prefix}${amount}` : amount;

		if (!inputValue || inputValue === "0") {
			updateCaretPosition(formattedValue.length);
			return formattedValue;
		}

		return formattedValue;
	}

	function onValueChange(values: NumberFormatValues, sourceInfo: SourceInfo) {
		const val = minimumFractionDigits
			? (Number.parseFloat(values.value) / divideBy).toFixed(minimumFractionDigits)
			: values.value;
		const floatVal = values.floatValue && minimumFractionDigits ? values.floatValue / divideBy : values.floatValue;

		props?.onValueChange?.(
			{
				value: val,
				floatValue: floatVal,
				formattedValue: values.formattedValue,
			},
			sourceInfo,
		);
	}

	/**
	 * decimal separator for current locale
	 */
	const getDecimalSeparator = (): string => {
		return (1.1).toLocaleString(locale).substring(1, 2);
	};

	/**
	 * thousand separator for current locale
	 */
	const getThousandSeparator = (): string => {
		const separator = (1000).toLocaleString(locale).substring(1, 2);
		// In case there are locales that don't use a thousand separator
		if (separator.match(/\d/)) return "";
		return separator;
	};

	/**
	 * set the curser at specific position
	 * @param  {number} pos
	 * @returns void
	 */
	const updateCaretPosition = (pos: number): void => {
		if (innerRef.current) {
			setCaretPosition(innerRef.current, pos);
		}
	};

	const correctCaretPosition = (isBackspace = false): void => {
		if (!innerRef.current) return;

		const currentCaretPosition = getCurrentCaretPosition(innerRef.current);
		const decimalSeparator = minimumFractionDigits ? `\\${getDecimalSeparator()}` : "";
		const thousandSeparator = getThousandSeparator() ? `\\${getThousandSeparator()}` : "";
		const separatorDecimalRegex = new RegExp(`^${decimalSeparator}${thousandSeparator}$`, "g");
		const currentCharacter = isBackspace
			? innerRef.current.value[currentCaretPosition - 1]
			: innerRef.current.value[currentCaretPosition];

		if (currentCharacter?.match(separatorDecimalRegex)) {
			const deletionPos = currentCaretPosition + (isBackspace ? -1 : 1);
			updateCaretPosition(deletionPos);
		}
	};

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		const { key } = event;
		if (key === "Backspace") {
			correctCaretPosition(true);
		} else if (key === "Delete") {
			correctCaretPosition(false);
		}

		props?.onKeyDown?.(event);
	}

	function onFocus(event: React.FocusEvent<HTMLInputElement>) {
		if (innerRef.current) {
			setCaretPosition(innerRef.current, innerRef.current.value.length);
		}
		props?.onFocus?.(event);
	}

	function onClick(event: React.MouseEvent<HTMLInputElement>) {
		if (innerRef.current) {
			setCaretPosition(innerRef.current, innerRef.current.value.length);
		}
		props?.onClick?.(event);
	}

	return (
		<NumberFormatBase<BaseType>
			{...(props as NumberFormatBaseProps<BaseType>)}
			format={format}
			onFocus={onFocus}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onValueChange={onValueChange}
			getInputRef={mergeRefs(innerRef, forwadedRef)}
			prefix={undefined}
			valueIsNumericString={false}
		/>
	);
}

export const CurrencyInput = forwardRef(RenderCurrencyInput) as <BaseType = InputAttributes>(
	props: CurrencyInputProps<BaseType> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof RenderCurrencyInput<BaseType>>;
