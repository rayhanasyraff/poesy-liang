export default function resizeChineseText(className: string): void {
  const chineseRegex = /[\u4e00-\u9fff]/;

  function processTextNode(textNode: Text): void {
    const text = textNode.nodeValue || '';
    const fragments: { text: string; chinese: boolean }[] = [];

    let buffer = '';
    let isChinese: boolean | null = null;

    for (const char of text) {
      const charIsChinese = chineseRegex.test(char);
      if (isChinese === null) {
        buffer = char;
        isChinese = charIsChinese;
      } else if (charIsChinese === isChinese) {
        buffer += char;
      } else {
        fragments.push({ text: buffer, chinese: isChinese });
        buffer = char;
        isChinese = charIsChinese;
      }
    }

    if (buffer) {
      fragments.push({ text: buffer, chinese: isChinese! });
    }

    const spanWrapper = document.createDocumentFragment();

    for (const fragment of fragments) {
      if (fragment.chinese) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = fragment.text;
        spanWrapper.appendChild(span);
      } else {
        spanWrapper.appendChild(document.createTextNode(fragment.text));
      }
    }

    const parent = textNode.parentNode;
    if (parent) {
      parent.replaceChild(spanWrapper, textNode);
    }
  }

  function traverse(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node as Text).nodeValue || '';
      if (chineseRegex.test(text)) {
        processTextNode(node as Text);
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !(node instanceof HTMLScriptElement) &&
      !(node instanceof HTMLStyleElement)
    ) {
      const childNodes = Array.from(node.childNodes);
      for (const child of childNodes) {
        traverse(child);
      }
    }
  }

  traverse(document.body);
}
