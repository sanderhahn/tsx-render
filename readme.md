# TSX Render

Experiment to allow inline JSX to be translated into `React.createElement` calls.
The calls build up a `Tag` structure that can be rendered into an Html string.
Falsy properties and children are ignored in the output.

```tsx
import { render, React } from "../tag";

const anchor = {
    title: "Hello World",
    href: "#hello-world",
};

console.log(render(<a href={anchor.href}>{anchor.title}</a>));
// <a href="#hello-world">Hello World</a>
```

More examples:

- [Array of children](src/examples/array.tsx)
- [Function Component](src/examples/function.tsx)
- [Class Component](src/examples/class.tsx)

References:

- [TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
