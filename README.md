# headless-currency-input

A customizable and feature-rich React component for handling currency input. It supports multiple currencies, formatting, and provides a seamless user experience for handling currency values.

> 👋 Hello there! Follow me [@danestves](https://twitter.com/danestves) or visit [danestves.com](https://danestves.com) for more cool projects like this one.

## Features

- 🌍 Supports multiple currencies (thanks to [@sumup/intl](https://github.com/sumup-oss/intl-js))
- 📝 Formats currency values (thanks to [react-number-format](https://github.com/s-yadav/react-number-format))
- 📱 Mobile friendly
- 🎨 Customizable
- 📦 Tiny bundle size

## 🏃 Getting started

### Install

```bash
npm install headless-currency-input
# or
yarn add headless-currency-input
# or
pnpm add headless-currency-input
# or
bun add headless-currency-input
```

### Usage

```tsx
import React from 'react';
import { CurrencyInput } from 'headless-currency-currency-input';

const App = () => {
  const [values, setValue] = React.useState(245698189);

  return (
    <CurrencyInput
      value={value}
      onValueChange={(values) => {
        console.log(values);

        /**
         * Will output:
         *
         * {
         *  formattedValue: "$ 2,456,981.89",
         *  value: '2456981.89',
         *  floatValue: 2456981.89,
         * }
         */
      }}
      currency="USD"
      locale="en-US"
    />
  );
};
```

## API Reference

### `currency`

The currency to use. Defaults to `USD`. Must be a valid currency code based on [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).

### `locale`

The locale to use. Defaults to `en`.


> [!TIP]
> You can find out more about the API (based on react-number-format) here https://s-yadav.github.io/react-number-format/docs/customization/
