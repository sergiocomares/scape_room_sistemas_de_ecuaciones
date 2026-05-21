// KaTeX renderer component — safely renders LaTeX math
import katex from 'katex';

interface Props {
  math: string;
  block?: boolean;
  className?: string;
}

export default function KatexRenderer({ math, block = false, className = '' }: Props) {
  let html = '';
  try {
    html = katex.renderToString(math, {
      throwOnError: false,
      displayMode: block,
      output: 'html',
    });
  } catch {
    html = `<span style="color:#ff3366">[Error LaTeX]</span>`;
  }

  if (block) {
    return (
      <div
        className={`overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
