import { afterEach, expect, it } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { forwardRef } from "react";
import type { InputAttributes } from "react-number-format";

import { CurrencyInput } from "../src";

expect.extend(matchers);

afterEach(() => {
	cleanup();
});

it('should show the initial value as "$ 0.00" when number 0 is passed', () => {
	const wrapper = render(<CurrencyInput value={0} />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	expect(input.value).toBe("$ 0.00");
});

it('should show the initial value as "$ 0.00" string when empty string is passed', () => {
	const wrapper = render(<CurrencyInput value="" />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	expect(input.value).toBe("$ 0.00");
});

it("should maintain decimal points", () => {
	const wrapper = render(<CurrencyInput />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	fireEvent.change(input, { target: { value: "2456981.89" } });

	expect(input.value).toBe("$ 2,456,981.89");
});

it("should handle different currency formats", () => {
	const wrapper = render(<CurrencyInput currency="EUR" locale="de-DE" />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	fireEvent.change(input, { target: { value: "1234.56" } });

	expect(input.value).toBe("1.234,56");
});

it("should handle currency symbol position correctly", () => {
	const wrapper = render(<CurrencyInput currency="JPY" locale="ja-JP" />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	fireEvent.change(input, { target: { value: "1234" } });

	expect(input.value).toBe("¥ 1,234");
});

it("should handle minimum and maximum fraction digits", () => {
	const wrapper = render(<CurrencyInput currency="JPY" />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	fireEvent.change(input, { target: { value: "1234.56" } });

	expect(input.value).toBe("¥ 123,456");
});

it("should handle custom input props", () => {
	const wrapper = render(
		<CurrencyInput placeholder="Enter amount" className="custom-class" data-testid="custom-input" />,
	);
	const input = wrapper.getByTestId("custom-input") as HTMLInputElement;

	expect(input.placeholder).toBe("Enter amount");
	expect(input.className).toContain("custom-class");
});

it("should handle onValueChange callback", () => {
	const onValueChange = () => {};
	const wrapper = render(<CurrencyInput onValueChange={onValueChange} />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	fireEvent.change(input, { target: { value: "1234.56" } });

	expect(input.value).toBe("$ 1,234.56");
});

it("should handle disabled state", () => {
	const wrapper = render(<CurrencyInput disabled />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	expect(input.disabled).toBe(true);
});

it("should handle readOnly state", () => {
	const wrapper = render(<CurrencyInput readOnly />);
	const input = wrapper.getByRole("textbox") as HTMLInputElement;

	expect(input.readOnly).toBe(true);
});

it("should handle custom input component", () => {
	const CustomInput = forwardRef<HTMLInputElement, InputAttributes>((props, ref) => (
		<input {...props} ref={ref} data-testid="custom-input" />
	));
	const wrapper = render(<CurrencyInput customInput={CustomInput} />);
	const input = wrapper.getByTestId("custom-input") as HTMLInputElement;

	expect(input).toBeTruthy();
});
