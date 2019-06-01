import { render, React, Component } from "../tag";

class Section extends Component {
    render() {
        return <section><h1>{this.props.title}</h1><div>{this.children}</div></section>;
    }
}

console.log(render(<Section title="Hello World">Content</Section>));
// <section><h1>Hello World</h1><div>Content</div></section>
