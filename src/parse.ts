import ts from "typescript";

const code = "<a href={anchor.href}>{anchor.title}</a>";
const src = ts.createSourceFile("tag.tsx", code, ts.ScriptTarget.Latest, true);

let indent = 0;
function print(node: ts.Node) {
    const kind = ts.SyntaxKind[node.kind];
    console.log(new Array(indent + 1).join(" ") + kind, node.getText());
    indent++;
    ts.forEachChild(node, print);
    indent--;
}

print(src);
