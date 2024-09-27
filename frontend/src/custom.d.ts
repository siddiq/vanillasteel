// src/custom.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    // 'md-filled-button': React.DetailedHTMLProps<
    //   React.HTMLAttributes<HTMLElement>,
    //   HTMLElement
    // >
    // 'md-outlined-button': React.DetailedHTMLProps<
    //   React.HTMLAttributes<HTMLElement>,
    //   HTMLElement
    // >
    // Add other Material Web components as needed
    [elemName: string]: any // Wildcard for untyped custom elements
  }
}
