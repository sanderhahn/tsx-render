import { render, React } from "../tag";

console.log(render(<ul>{[1, 2].map(i => <li>{i}</li>)}</ul>));
// <ul><li>1</li><li>2</li></ul>
