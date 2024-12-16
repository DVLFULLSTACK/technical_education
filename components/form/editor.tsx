"use client"

import React, { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import toast from 'react-hot-toast';
import imageAction from '@/app/actions/imageAction';


interface EditorProps {
  // Add any additional props you might need for your editor here
  onChange: (value: string) => void
}

const Editor = ({ onChange} : EditorProps) => {
  const [value, setValue] = useState('');

  const quillRef = useRef<ReactQuill | null>(null); // Create a ref to the editor

  // Handler for uploading image
  const handleImageUpload = async (file: File) => {
    try {
      console.log('Uploading image...');
      const response = await imageAction.upload(file); // Upload image to your server
      const imageUrl = response.data.link; // Get the image URL from the response

      const quill = quillRef.current?.getEditor(); // Get the Quill editor instance

      if (quill) {
        const range = quill.getSelection(); // Get the current cursor position
        console.log('Range: ',range)
        if (range) {
          // Check if the range is valid (start index should be a number)
          if (typeof range.index === 'number') {
            // Insert the image at the cursor position
            quill.insertEmbed(range.index, 'image', imageUrl);

            // Update the content state to reflect the changes
            // setValue(quill.root.innerHTML); // Update the value of the editor
          } else {
            console.error("Invalid range index.");
          }
        } else {
          console.error("No selection range found.");
        }
      }
    } catch (error) {
      toast.error("Lỗi tải ảnh lên");
      console.error("Error uploading image:", error);
    }
  };

  // Event handler for file input change
  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file); // Call the image upload function
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue)
  };

  const modules = useMemo(() =>( {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image'],
      ],
      handlers: {
        image: () => {
          // Trigger the hidden file input when the image button is clicked
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.click();
          input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
              handleImageUpload(file); // Upload the selected image
            }
          };
        },
      },
    },
  }) ,[])

  return (
    <div className='h-64'>
      <ReactQuill
        ref={quillRef} // Attach the ref to the Quill editor
        value={value}
        className='h-48'
        theme="snow" // Use the 'snow' theme
        id='quill'
        // Set the value to control the editor content
        onChange={handleChange} // Update the value whenever the content changes
        modules={modules}
        formats={['header', 'bold', 'italic', 'underline', 'image']} // Set allowed formats
      />
    </div>
  );
};


export default Editor
