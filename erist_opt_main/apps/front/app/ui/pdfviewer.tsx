'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PDFViewerProps {
  file: string;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error: any) {
    setError(error.message || 'Failed to load PDF');
    setLoading(false);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative h-4/5 overflow-auto">
      {loading && <div>Loading...</div>}
      <div className="flex items-center justify-between absolute z-10 w-full px-2 top-0 left-0">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
        </button>
      </div>
      <div className="flex justify-center h-fit items-center ">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page
            pageNumber={pageNumber}
            width={Math.min(window.innerWidth * 0.9, 800)}
            height={1}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
