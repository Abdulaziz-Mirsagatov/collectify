"use client";
import { useEdgeStore } from "@/app/edgestore";
import Image from "next/image";
import { useState } from "react";

const ImageInput = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      >
        Upload
      </button>

      {file && (
        <Image
          width={200}
          height={200}
          src={URL.createObjectURL(file)}
          alt="preview"
        />
      )}
    </div>
  );
};

export default ImageInput;
