import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name,control,label,defaultValue=""}) {
  const API_KEY = "vno42g2asys1gr491213tzm3eugpoow4amrb6r4w1yh2iuqh";
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({field:{onChange}})=>(
          <Editor
          apiKey={API_KEY}
          initialValue={defaultValue}
         init={{
             initialValue: defaultValue,
             height: 500,
             menubar: false,
             plugins: [
               'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
               'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
               'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
             ],
             toolbar: 'undo redo | blocks | ' +
               'bold italic forecolor | alignleft aligncenter ' +
               'alignright alignjustify | bullist numlist outdent indent | ' +
               'removeformat | help',
             content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
           }}
           onEditorChange={onChange}
          />
         )}
      />
    </div>
  )
}

export default RTE
