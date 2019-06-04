import ts from "typescript";

const src = "<button on:click={e => counter += 1}>Click {counter}</button>";
const tree = ts.createSourceFile("tag.tsx", src, ts.ScriptTarget.Latest, true);

function walkTree(
  node: ts.Node,
  enter: (node: ts.Node) => void,
  leave: (node: ts.Node) => void
) {
  enter(node);
  for (const child of node.getChildren()) {
    walkTree(child, enter, leave);
  }
  leave(node);
}

let level = 0;
walkTree(
  tree,
  (node: ts.Node) => {
    const kind = ts.SyntaxKind[node.kind];
    console.log(Array(level).join(" "), kind, `: '${node.getFullText()}'`);
    level += 2;
  },
  (node: ts.Node) => {
    level -= 2;
  }
);
