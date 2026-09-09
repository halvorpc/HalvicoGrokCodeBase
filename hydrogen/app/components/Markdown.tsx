import type {ReactNode} from 'react';

/** Lightweight markdown → React for pairing posts (no extra deps). */
export function Markdown({content}: {content: string}) {
  const blocks = content.trim().split(/\n\n+/);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    if (block.startsWith('## ')) {
      nodes.push(
        <h2 key={i}>{inline(block.replace(/^##\s+/, ''))}</h2>,
      );
      continue;
    }

    if (block.startsWith('- ') || block.includes('\n- ')) {
      const items = block
        .split(/\n/)
        .map((l) => l.replace(/^[-*]\s+/, '').trim())
        .filter(Boolean);
      nodes.push(
        <ul key={i}>
          {items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    nodes.push(<p key={i}>{inline(block.replace(/\n/g, ' '))}</p>);
  }

  return <div className="prose-besties">{nodes}</div>;
}

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}
