import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CurrencyInput } from "../src";

describe("CurrencyInput", () => {
	it("renders correctly", () => {
		const wrapper = render(<CurrencyInput value={0} />);
		expect(wrapper).toMatchSnapshot();
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
});
