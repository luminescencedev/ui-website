import type { ReactNode } from 'react';
import { highlight } from '@/lib/shiki';
import { Expandable } from './Expandable';

/**
 * A live component over the code that made it — one unit, because they are one
 * claim. A docs page that shows a screenshot beside a snippet is asking to be
 * believed; this one can be pressed.
 *
 * The stage is sunken and the code sits on the surface, so the two halves of the
 * block read as a thing and a description of it rather than as two blocks. No
 * dots: that stage belongs to the playground, where its whole job is to catch a
 * panel claiming to be opaque. Here it would be a texture arguing with twenty
 * components at once.
 *
 * Highlighted on the server. Shiki loads a full TextMate grammar, and shipping
 * that to a browser to colour twelve lines is what makes a documentation site
 * slower than the app it documents.
 */
export async function Example({
  children,
  code,
  lang = 'tsx',
  /** Taller, for something that needs the room — a drawer, a stack of toasts. */
  tall = false,
}: {
  children: ReactNode;
  code: string;
  lang?: string;
  tall?: boolean;
}) {
  const html = await highlight(code.trim(), lang);

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: '1px solid var(--border)', marginBlock: 20 }}
    >
      <div
        className="flex items-center justify-center px-6"
        style={{
          minHeight: tall ? 360 : 190,
          paddingBlock: 34,
          background: 'var(--surface-sunken)',
        }}
      >
        {children}
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <Expandable html={html} code={code.trim()} />
      </div>
    </div>
  );
}
