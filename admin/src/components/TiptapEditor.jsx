import React from 'react'
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Highlight from '@tiptap/extension-highlight'
import './editor-style.css' 

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="toolbar">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
      <button onClick={() => editor.chain().focus().setHighlight({ color: '#f59e0b' }).run()}>Highlight</button>
      <button onClick={() => {
        const url = prompt('URL:')
        if (url) editor.chain().focus().setLink({ href: url }).run()
      }}>Link</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
      <button onClick={() => {
        const url = prompt('Image URL:')
        if (url) editor.chain().focus().setImage({ src: url }).run()
      }}>Image</button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>Table</button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>Remove Table</button>
    </div>
  )
}

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Color,
      TextStyle,
      Highlight,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '<p></p>',// contetn ||
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange && onChange(html)
    },
  })
//เป็นการใช้ useEffect เพื่อให้ editor ทำการ setContent ใหม่เมื่อ content เปลี่ยนแปลง
  // โดยจะทำการตรวจสอบว่า editor และ content มีค่าอยู่หรือไม่
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}

export default TiptapEditor
