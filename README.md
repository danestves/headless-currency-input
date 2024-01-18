# headless-currency-input

A customizable and feature-rich React component for handling currency input. It supports multiple currencies, formatting, and provides a seamless user experience for handling currency values.

[Demo](https://codesandbox.io/p/devbox/headless-currency-input-4gwsy8?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clrjd1qfr00073b6fbm6kur58%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clrjd1qfr00023b6fxtdpd1ub%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clrjd1qfr00043b6fw8s5c78s%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clrjd1qfr00063b6f3nqon92r%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clrjd1qfr00023b6fxtdpd1ub%2522%253A%257B%2522id%2522%253A%2522clrjd1qfr00023b6fxtdpd1ub%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clrjd1qfq00013b6fkj0m7iz2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clrjd1qfq00013b6fkj0m7iz2%2522%257D%252C%2522clrjd1qfr00063b6f3nqon92r%2522%253A%257B%2522id%2522%253A%2522clrjd1qfr00063b6f3nqon92r%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522port%2522%253A5173%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clrjexs5h004g3b6e0o88gjpk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clrjexs5h004g3b6e0o88gjpk%2522%257D%252C%2522clrjd1qfr00043b6fw8s5c78s%2522%253A%257B%2522id%2522%253A%2522clrjd1qfr00043b6fw8s5c78s%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clrjd1qfr00033b6f8r1fjnbn%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clrjd1qfr00033b6f8r1fjnbn%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

https://github.com/danestves/headless-currency-input/assets/31737273/5f32f037-b2fd-423e-8a94-6cf22f9ff22e

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
import { CurrencyInput } from 'headless-currency-input';

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

*default:* `USD`

The currency to use. Must be a valid currency code based on [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).

### `locale`

*default:* `en`

The locale to use. Must be a valid locale based on [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

### displayType `text | input`

*default:* `input`

If value is `input`, it renders an input element where formatting happens as you type characters. If value is text, it renders formatted `text` in a span tag.

```tsx
import { CurrencyInput } from 'headless-currency-input';

<CurrencyInput displayType="input" value={110} />;
<CurrencyInput displayType="text" value={110} />;
```

> [!NOTE]
> More info https://s-yadav.github.io/react-number-format/docs/props#displaytype-text--input

### getInputRef `elm => void`

*default:* `null`

Method to get reference of input, span (based on displayType prop) or the customInput's reference.

```tsx
import { CurrencyInput } from 'headless-currency-input';
import { useRef } from 'react';

export default function App() {
  let ref = useRef();
  return <CurrencyInput getInputRef={ref} />;
}
```

> [!NOTE]
> More info https://s-yadav.github.io/react-number-format/docs/props#getinputref-elm--void

### isAllowed `(values) => boolean`

*default:* `undefined`

A checker function to validate the input value. If this function returns false, the onChange method will not get triggered and the input value will not change.

```tsx
import { CurrencyInput } from 'headless-currency-input';

const MAX_LIMIT = 1000;

<CurrencyInput
  value={11}
  isAllowed={(values) => {
    const { floatValue } = values;
    return floatValue < MAX_LIMIT;
  }}
/>;
```

> [!NOTE]
> More info https://s-yadav.github.io/react-number-format/docs/props#isallowed-values--boolean

### onValueChange `(values, sourceInfo) => {}`

*default:* `undefined`

This handler provides access to any values changes in the input field and is triggered only when a prop changes or the user input changes. It provides two arguments namely the [valueObject](https://s-yadav.github.io/react-number-format/docs/quirks#values-object) as the first and the [sourceInfo](https://s-yadav.github.io/react-number-format/docs/quirks#sourceInfo) as the second. The [valueObject](https://s-yadav.github.io/react-number-format/docs/quirks#values-object) parameter contains the `formattedValue`, `value` and the `floatValue` of the given input field. The [sourceInfo](https://s-yadav.github.io/react-number-format/docs/quirks#sourceInfo) contains the `event` Object and a `source` key which indicates whether the triggered change is due to an event or a prop change. This is particularly useful in identify whether the change is user driven or is an uncontrolled change due to any prop value being updated.

```tsx
import { CurrencyInput } from 'headless-currency-input';

<CurrencyInput
  value={1234}
  onValueChange={(values, sourceInfo) => {
    console.log(values, sourceInfo);
  }}
/>;
```

> [!NOTE]
> More info https://s-yadav.github.io/react-number-format/docs/props#onvaluechange-values-sourceinfo--

### renderText `(formattedValue, customProps) => React Element`

*default:* `undefined`

A renderText method useful if you want to render formattedValue in different element other than span. It also returns the custom props that are added to the component which can allow passing down props to the rendered element.

```tsx
import { CurrencyInput } from 'headless-currency-input';

<CurrencyInput
  value={1231231}
  displayType="text"
  renderText={(value) => <b>{value}</b>}
/>;
```

> [!NOTE]
> More info https://s-yadav.github.io/react-number-format/docs/props#rendertext-formattedvalue-customprops--react-element

---

> [!TIP]
> Other than this it accepts all the props which can be given to a input or span based on displayType you selected.

