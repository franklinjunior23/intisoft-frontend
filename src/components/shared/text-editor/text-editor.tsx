import {  useRef } from 'react'
import RichTextEditor, {
    BaseKit,
    Blockquote,
    Bold,
    BulletList,
    Clear,
    Code,
    CodeBlock,
    Color,
    ColumnActionButton,
    Emoji,
    FontFamily,
    FontSize,
    FormatPainter,
    Heading,
    History,
    HorizontalRule,
    Image,
    Indent,
    Italic,
    Katex,
    LineHeight,
    MoreMark,
    OrderedList,
    SearchAndReplace,
    SlashCommand,
    Strike,
    Table,
    TableOfContents,
    TaskList,
    TextAlign,
    TextDirection,
    Underline,
} from 'reactjs-tiptap-editor'

// Import CSS
import 'reactjs-tiptap-editor/style.css'

const extensions = [
    History,
    BaseKit.configure({
        multiColumn: true,
        placeholder: {
            showOnlyCurrent: true,
        },
        characterCount: {
            limit: 50_000,
        },
    }),
    SearchAndReplace,
    TextDirection,
    TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold.configure({
        toolbar: true,
    }),
    Italic,
    Underline,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Strike,
    MoreMark,
    Katex,
    Emoji,
    Color.configure({ spacer: true }),
    BulletList,
    Indent,
    LineHeight,
    TaskList.configure({
        spacer: true,
        taskItem: {
            nested: true,
        },
    }),
    Image.configure({
        upload: (files: File) => {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    resolve(reader.result as string) // El resultado será una cadena base64
                }
                reader.readAsDataURL(files) // Leer el archivo como una URL base64
            })
        },
    }),
    // Removed Link from extensions array
    Blockquote.configure({ spacer: true }),
    SlashCommand,
    HorizontalRule,
    Code.configure({
        toolbar: true,
    }),
    CodeBlock.configure({ defaultTheme: 'dracula' }),
    ColumnActionButton,
    Table,
]
type TextEditorProps = {
    state: string
    changeText: () => void
    disabled?: boolean
}
export default function TextEditor({
    state,
    changeText,
    disabled = false,
}: TextEditorProps) {
    const refEditor = useRef(null)

    return (
        <>
            <RichTextEditor
                ref={refEditor}
                output="html"
                disabled={disabled}
                content={state}
                contentClass={'provider-text-write'}
                onChangeContent={changeText}
                extensions={extensions}
            />
        </>
    )
}
