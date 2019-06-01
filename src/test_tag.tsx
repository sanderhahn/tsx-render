import assert from "assert";
import {encodeHtml, render, Component, React, Children, Tag} from "./tag";

assert(encodeHtml("<>&\"") === "&lt;&gt;&amp;&quot;");

assert(render(<></>) === "");
assert(render(<div><b>&lt;</b></div>) === "<div><b>&lt;</b></div>");
assert(render(<div>{1}</div>) === "<div>1</div>");
assert(render(<img src="&quot;" />) === `<img src="&quot;">`);

// Stateless Functional Component
function Section(props: { title: string }, children: Children): Tag {
    return <><h1>{props.title}</h1><div>{children}</div></>;
}

assert(render(<div>{[<hr />, <hr />]}</div>) === "<div><hr><hr></div>");

const doc = <Section title="Hello"><b></b>World</Section>;
assert(render(doc) === "<h1>Hello</h1><div><b></b>World</div>");

const items = [...Array(2).keys()];
assert(render(
    <ul>{items.map((i) =>
        <li>{`Item ${i}`}</li>
    )}</ul>) === "<ul><li>Item 0</li><li>Item 1</li></ul>");

assert(render(<div id={false} />) === "<div></div>");
assert(render(<input value={false} />) === "<input>");
assert(render(<div>{false}</div>) === "<div></div>");

// Class Component
class MyTag extends Component {
    render() {
        return <div class="mytag"><h1>{this.props.title}</h1>{this.children}</div>
    }
}

const doc2 = <MyTag title="Hey"><tab /></MyTag>
assert(render(doc2) === `<div class="mytag"><h1>Hey</h1><tab></tab></div>`);

// React raw html:
// console.log(<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />);
