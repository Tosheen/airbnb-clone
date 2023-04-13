"use client";

import * as React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
};

export const ImageUpload = (props: ImageUploadProps) => {
  const { onChange } = props;
  const handleUpload = React.useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="p2bqeaoi"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => open?.()}
            className="relative hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <h3 className="text-lg">Click to upload</h3>
            {props.value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={props.value}
                  alt="Upload"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
