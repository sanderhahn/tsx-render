import { render, React, Children, Tag } from "../tag";

function Section(props: { title: string }, children: Children): Tag {
    return <section><h1>{props.title}</h1><div>{children}</div></section>;
}

console.log(render(<Section title="Hello World">Content</Section>));
// <section><h1>Hello World</h1><div>Content</div></section>
