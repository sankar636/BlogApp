import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({
    name,control,label,defaultValue=""
}){
    return (
        <div className="w-full">
            {
                label && <label
                className="inline-block mb-1 pl-1"
                >
                    {label}
                </label>
            }
            <Controller
            name={name || "Content"}
            render={({field: {onChange}}) => (
                <Editor
                initialValue={defaultValue}
                init={{
                    branding: false,
                    height: 500,
                    menubar: true,
                    plugins: [
                        'a11ychecker', 'accordion', 'advlist', 'anchor', 'autolink', 'autosave',
                        'charmap', 'code', 'codesample', 'directionality', 'emoticons', 'exportpdf',
                        'exportword', 'fullscreen', 'help', 'image', 'importcss', 'importword',
                        'insertdatetime', 'link', 'lists', 'markdown', 'math', 'media', 'nonbreaking',
                        'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace', 'table',
                        'visualblocks', 'visualchars', 'wordcount'
                      ],
                      toolbar: 'undo redo | accordion accordionremove | ' +
                      'importword exportword exportpdf | math | ' +
                      'blocks fontfamily fontsize | bold italic underline strikethrough | ' +
                      'align numlist bullist | link image | table media | ' +
                      'lineheight outdent indent | forecolor backcolor removeformat | ' +
                      'charmap emoticons | code fullscreen preview | save print | ' +
                      'pagebreak anchor codesample | ltr rtl',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={onchange}
                />
            )}
            /> 
            {/* this is from react-hook-from */}
        </div>
    )
}
export default RTE

/*
RTE stands for Rich Text Editor.

In React (or any frontend framework), an RTE component is a special input box where users can:
format text (bold, italic, underline),
add headings, lists, images,
and create "rich" (formatted) content — not just plain text.

In React, popular RTE libraries are:
react-quill 🖋️
draft.js ✍️
tinyMCE 📝// we will use this here
ckeditor ✨
*/

/*
Controller from react-hook-form helps you manage non-standard inputs like RTEs, because RTEs don't behave like simple <input> or <textarea>.

👉 So if you use an RTE inside a form, you wrap it inside a Controller to properly:
capture its value,
validate it,
submit it as part of the form.
*/