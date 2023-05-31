import React, { useEffect } from 'react';

const scripts = [
  {
    name: 'pdfjsLib',
    src: 'https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js',
  },
  {
    name: 'PDFLib',
    src: 'https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js',
  },
  {
    name: 'download',
    src: 'https://unpkg.com/downloadjs@1.4.7',
  },
  {
    name: 'makeTextPDF',
    src:
      'https://cdn.jsdelivr.net/gh/snamoah/react-pdf-editor/public/makeTextPDF.js',
  },
  { name: 'w3Color', src: 'https://www.w3schools.com/lib/w3color.js' },
];

const assets = {};

const getAsset = (scriptName) => assets[scriptName];

const usePrepareAssets = () => {
  useEffect(() => {
    const loadScript = async (script) => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.onload = () => {
          resolve(window[script.name]);
          console.log(`${script.name} is loaded.`);
        };
        scriptElement.onerror = () =>
          reject(`The script ${script.name} didn't load correctly.`);
        document.body.appendChild(scriptElement);
      });
    };

    const loadAssets = async () => {
      for (const script of scripts) {
        try {
          assets[script.name] = await loadScript(script);
        } catch (error) {
          console.error(error);
        }
      }
    };

    loadAssets();
  }, []);
};

const fonts = {
  Courier: {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 6;
    },
  },
  Helvetica: {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 10;
    },
  },
  'Times-Roman': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
  },
};

const Fonts = {
  ...fonts,
  標楷體: {
    src: '/CK.ttf',
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2;
    },
  },
};

const fetchFont = async (name) => {
  if (fonts[name]) return fonts[name];

  const font = Fonts[name];
  if (!font) throw new Error(`Font '${name}' does not exist.`);

  try {
    const response = await fetch(font.src);
    const fontBuffer = await response.arrayBuffer();
    const fontFace = new FontFace(name, fontBuffer);
    fontFace.display = 'swap';
    await fontFace.load();
    document.fonts.add(fontFace);

    return {
      ...font,
      buffer: fontBuffer,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const MyComponent = () => {
  usePrepareAssets();

  return <div>{/* JSX content */}</div>;
};

export { getAsset, MyComponent };


