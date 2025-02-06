declare namespace JSX {
  interface IntrinsicElements {
    "l-ring": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      size?: string;
      stroke?: string;
      bgOpacity?: string;
      speed?: string;
      color?: string;
    };
  }
}
