/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare namespace JSX {
    interface IntrinsicElements {
        'l-tailspin': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        >
    }
}
