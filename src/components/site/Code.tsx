import { highlight } from '@/lib/shiki';
import { Copy } from './Copy';

/**
 * A code block, highlighted on the server.
 *
 * A server component so Shiki stays out of the bundle entirely — it loads a full
 * TextMate grammar, and shipping that to a browser to colour twelve lines is the
 * kind of thing that makes a docs site slower than the app it documents.
 *
 * `bare` drops the frame, for a block that already sits inside one.
 */
export async function Code({
  code,
  lang = 'tsx',
  bare = false,
}: {
  code: string;
  lang?: string;
  bare?: boolean;
}) {
  const html = await highlight(code, lang);

  const block = (
    <div className="group relative">
      <div className="overflow-x-auto px-4 py-3.5" dangerouslySetInnerHTML={{ __html: html }} />

      {/*
       * The copy button appears on hover and stays for the keyboard. Hidden until
       * focus-within too, or a keyboard can reach a control it cannot see.
       */}
      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <Copy text={code.trim()} label="Copy code" />
      </div>
    </div>
  );

  if (bare) return block;

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        marginBlock: 16,
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border)',
      }}
    >
      {block}
    </div>
  );
}
