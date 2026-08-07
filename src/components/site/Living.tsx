/**
 * One word in the headline, set apart.
 *
 * Instrument Serif italic, a vertical blue ramp clipped to the glyphs, a hairline
 * text stroke and two drop shadows for the bloom. That is the whole thing.
 *
 * The typing and the blinking caret are gone. A caret that never stops blinking
 * after the word has landed is a field that is not there, and the reveal made the
 * first second of the page a reflow rather than a headline.
 *
 * No JavaScript left in it either, which is the point: the word is text, it is
 * there on the first paint, and it cannot fail to a blank space.
 */
export function Living({ children }: { children: string }) {
  return (
    <span className="living" data-text={children}>
      {children}
    </span>
  );
}
