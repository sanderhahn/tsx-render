import { render, React } from "../tag";

const anchor = {
    title: "Hello World",
    href: "#hello-world",
};

console.log(render(<a href={anchor.href}>{anchor.title}</a>));
// <a href="#hello-world">Hello World</a>
