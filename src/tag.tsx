type SFC = (props: any, children?: Children) => Tag;
type ComponentConstructor = new (props: any, children?: Children) => Component;

type Child = Tag | string | Children;
export interface Children extends Array<Child> { };

export interface Tag {
    tag?: string | SFC | ComponentConstructor;
    attrs?: { [key: string]: string };
    children: Children;
}

export const React = {
    createElement(tag: string, attrs: any, ...children: Children): Tag {
        return {
            tag,
            attrs,
            children,
        };
    }
}

export abstract class Component {
    props: any;
    children?: Children;
    constructor(props: any, children?: Children) {
        this.props = props;
        this.children = children;
    }
    abstract render(): Tag;
}

export function encodeHtml(html: string): string {
    return html.replace(/[<>&"]/g, (m) => {
        switch (m) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            default:
                return m;
        }
    });
}

const voidElements: { [key: string]: boolean } = "area base br col command embed hr img input keygen link meta param source track wbr"
    .split(" ")
    .reduce((agg: { [key: string]: boolean }, tag: string) => {
        agg[tag] = true;
        return agg;
    }, {});

function isFalsy(value: any) {
    return value === false || value === undefined || value === null;
}

export function render(tag: Child): string {
    let html = "";
    if (tag instanceof Array) {
        for (const node of tag) {
            html += render(node);
        }
        return html;
    } else if (typeof tag === "object") {
        if (typeof tag.tag === "function") {
            const comp = tag.tag as ComponentConstructor;
            if (typeof comp.prototype.render === "function") {
                tag = new comp(tag.attrs, tag.children).render();
            } else {
                const sfc = tag.tag as SFC;
                tag = sfc.call(null, tag.attrs, tag.children);
            }
        }
        if (tag.tag !== undefined) {
            const tagname = tag.tag as string;
            html += `<${tagname}`;
            if (tag.attrs) {
                for (const [key, value] of Object.entries(tag.attrs)) {
                    if (!isFalsy(value)) {
                        html += ` ${key}="${encodeHtml(value)}"`;
                    }
                }
            }
            if (tag.children.length === 0 && voidElements.hasOwnProperty(tagname)) {
                html += ">";
                return html;
            }
            html += ">";
        }
        html += render(tag.children);
        if (tag.tag !== undefined) {
            const tagname = tag.tag as string;
            html += `</${tagname}>`;
        }
        return html;
    } else if (isFalsy(tag)) {
        return "";
    } else {
        return encodeHtml(`${tag}`);
    }
}
