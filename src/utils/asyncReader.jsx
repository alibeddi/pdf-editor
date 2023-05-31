import { useEffect, useState } from 'react';
import { getAsset } from './prepareAssets';

export const readAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readAsImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (src instanceof Blob) {
      const url = window.URL.createObjectURL(src);
      img.src = url;
    } else {
      img.src = src;
    }
  });
};

export const readAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const readAsPDF = async (file) => {
  try {
    const pdfjsLib = await getAsset('pdfjsLib');
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    const document = await pdfjsLib.getDocument(url).promise;
    return document;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




