import React, { useState, useRef } from 'react';
import { readAsPDF, readAsDataURL, readAsImage } from '../utils/asyncReader';
import ggID from '../utils/helpers';
import { usePdf } from './usePdf';
import { AttachmentTypes } from '../entities';

const UploadTypes = {
  PDF: 'pdf',
  IMAGE: 'image',
};

const useUploader = ({ use, afterUploadPdf, afterUploadAttachment }) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const { initialize } = usePdf();

  const onClick = () => {
    inputRef.current.value = '';
  };

  const handleClick = () => {
    setIsUploading(true);
    inputRef.current.click();
  };

  const upload = async (event) => {
    if (!isUploading) {
      return;
    }

    const files = event.target.files || event.dataTransfer.files;
    if (!files) {
      setIsUploading(false);
      return;
    }

    const file = files[0];

    try {
      let result = null;

      if (use === UploadTypes.PDF) {
        const pdf = await readAsPDF(file);
        const pages = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, index) =>
            pdf.getPage(index + 1)
          )
        );
        result = {
          file,
          name: file.name,
          pages,
        };
      } else if (use === UploadTypes.IMAGE) {
        const url = await readAsDataURL(file);
        const img = await readAsImage(url);
        const id = ggID();
        const { width, height } = img;

        const imageAttachment = {
          id,
          type: AttachmentTypes.IMAGE,
          width,
          height,
          x: 0,
          y: 0,
          img,
          file,
        };
        result = imageAttachment;
      }

      if (result) {
        if (use === UploadTypes.PDF && afterUploadPdf) {
          afterUploadPdf(result);
        }

        if (use === UploadTypes.IMAGE && afterUploadAttachment) {
          afterUploadAttachment(result);
        }

        initialize(result);
      }
    } catch (error) {
      console.log(`Failed to load ${use}`, error);
      throw new Error(`Failed to load ${use.toUpperCase()}`);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    handleClick,
  };
};

export default useUploader;
export { UploadTypes };


