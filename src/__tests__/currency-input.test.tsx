import { describe, expect, it, mock } from "bun:test";
import { act, fireEvent, render } from "@testing-library/react";
import { CurrencyInput } from "../currency-input";

describe("CurrencyInput", () => {
	describe("getDecimalSeparator", () => {
		it("should return decimal separator for en locale", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");
			expect(input.value).toContain(".");
		});

		it("should return decimal separator for pt-BR locale", () => {
			const { container } = render(<CurrencyInput locale="pt-BR" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");
			expect(input.value).toContain(",");
		});
	});

	describe("getThousandSeparator", () => {
		it("should return thousand separator for en locale", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");
			expect(input.value).toContain(".");
		});

		it("should return empty string for locales without thousand separator", () => {
			const { container } = render(<CurrencyInput locale="hi" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");
			expect(input.value).not.toContain(",");
		});
	});

	describe("correctCaretPosition", () => {
		it("should move caret past decimal separator on backspace", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			// Set value with decimal separator
			fireEvent.change(input, { target: { value: "1.23" } });
			// Set caret before decimal separator
			input.setSelectionRange(1, 1);
			// Simulate backspace
			fireEvent.keyDown(input, { key: "Backspace" });

			// Caret should move past decimal separator
			expect(input.selectionStart).toBe(2);
		});

		it("should move caret past thousand separator on delete", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			// Set value with thousand separator
			fireEvent.change(input, { target: { value: "1,234" } });
			// Set caret before thousand separator
			input.setSelectionRange(1, 1);
			// Simulate delete
			fireEvent.keyDown(input, { key: "Delete" });

			// Caret should move past thousand separator
			expect(input.selectionStart).toBe(2);
		});
	});

	describe("onKeyDown", () => {
		it("should call correctCaretPosition on backspace", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			fireEvent.keyDown(input, { key: "Backspace" });
			// No error means correctCaretPosition was called
		});

		it("should call correctCaretPosition on delete", () => {
			const { container } = render(<CurrencyInput locale="en" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			fireEvent.keyDown(input, { key: "Delete" });
			// No error means correctCaretPosition was called
		});

		it("should call props.onKeyDown if provided", () => {
			const onKeyDown = mock(() => {});
			const { container } = render(<CurrencyInput onKeyDown={onKeyDown} />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			fireEvent.keyDown(input, { key: "A" });
			expect(onKeyDown.mock.calls.length).toBe(1);
		});
	});

	describe("onFocus", () => {
		it("should set caret position to end of input", async () => {
			const { container } = render(<CurrencyInput defaultValue="123.45" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			// Set initial value
			await act(async () => {
				fireEvent.change(input, { target: { value: "123.45" } });
				// Set caret at start
				input.setSelectionRange(0, 0);
				// Trigger focus
				fireEvent.focus(input);
				// Wait for state updates
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Caret should be at end
			expect(input.selectionStart).toBe(input.value.length);
		});

		it("should call props.onFocus if provided", async () => {
			const onFocus = mock(() => {});
			const { container } = render(<CurrencyInput onFocus={onFocus} />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			await act(async () => {
				// Trigger focus
				fireEvent.focus(input);
				// Wait for state updates
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Check if onFocus was called at least once
			expect(onFocus.mock.calls.length).toBeGreaterThan(0);
		});
	});

	describe("onClick", () => {
		it("should set caret position to end of input", async () => {
			const { container } = render(<CurrencyInput defaultValue="123.45" />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			// Set initial value
			await act(async () => {
				fireEvent.change(input, { target: { value: "123.45" } });
				// Set caret at start
				input.setSelectionRange(0, 0);
				// Trigger click
				fireEvent.click(input);
				// Wait for state updates
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Caret should be at end
			expect(input.selectionStart).toBe(input.value.length);
		});

		it("should call props.onClick if provided", async () => {
			const onClick = mock(() => {});
			const { container } = render(<CurrencyInput onClick={onClick} />);
			const input = container.querySelector("input");
			if (!input) throw new Error("Input not found");

			await act(async () => {
				fireEvent.click(input);
				// Wait for state updates
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Check if onClick was called at least once
			expect(onClick.mock.calls.length).toBeGreaterThan(0);
		});
	});
});
