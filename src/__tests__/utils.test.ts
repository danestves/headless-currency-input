import { describe, expect, it } from "bun:test";
import { getCurrentCaretPosition, setCaretPosition } from "../utils";

describe("utils", () => {
	describe("setCaretPosition", () => {
		it("should set caret position correctly", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			const result = setCaretPosition(input, 2);
			expect(result).toBe(true);
			expect(input.selectionStart).toBe(2);
			expect(input.selectionEnd).toBe(2);

			document.body.removeChild(input);
		});

		it("should handle null input element", () => {
			const result = setCaretPosition(null as unknown as HTMLInputElement, 2);
			expect(result).toBe(false);
		});

		it("should handle input without selectionStart", () => {
			const input = document.createElement("input");
			input.value = "12345";
			// Remove selectionStart property to simulate older browsers
			Object.defineProperty(input, "selectionStart", {
				get: () => undefined,
			});
			document.body.appendChild(input);

			const result = setCaretPosition(input, 2);
			expect(result).toBe(false);

			document.body.removeChild(input);
		});

		it("should handle position at the end of input", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			const result = setCaretPosition(input, input.value.length);
			expect(result).toBe(true);
			expect(input.selectionStart).toBe(input.value.length);
			expect(input.selectionEnd).toBe(input.value.length);

			document.body.removeChild(input);
		});

		it("should handle position at the start of input", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			const result = setCaretPosition(input, 0);
			expect(result).toBe(true);
			expect(input.selectionStart).toBe(0);
			expect(input.selectionEnd).toBe(0);

			document.body.removeChild(input);
		});
	});

	describe("getCurrentCaretPosition", () => {
		it("should return the maximum of selectionStart and selectionEnd", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			// Set selection range
			input.setSelectionRange(2, 4);
			expect(getCurrentCaretPosition(input)).toBe(4);

			// Set selection range in reverse order
			input.setSelectionRange(4, 2);
			expect(getCurrentCaretPosition(input)).toBe(4);

			document.body.removeChild(input);
		});

		it("should handle single position selection", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			input.setSelectionRange(3, 3);
			expect(getCurrentCaretPosition(input)).toBe(3);

			document.body.removeChild(input);
		});

		it("should handle position at the end of input", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			input.setSelectionRange(input.value.length, input.value.length);
			expect(getCurrentCaretPosition(input)).toBe(input.value.length);

			document.body.removeChild(input);
		});

		it("should handle position at the start of input", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			input.setSelectionRange(0, 0);
			expect(getCurrentCaretPosition(input)).toBe(0);

			document.body.removeChild(input);
		});

		it("should handle null selection values", () => {
			const input = document.createElement("input");
			input.value = "12345";
			document.body.appendChild(input);

			// Simulate null selection values
			Object.defineProperty(input, "selectionStart", {
				get: () => null,
			});
			Object.defineProperty(input, "selectionEnd", {
				get: () => null,
			});

			expect(getCurrentCaretPosition(input)).toBe(0);

			document.body.removeChild(input);
		});
	});
});
