import React, { useState } from "react";

interface DocumentUploadProps {
  onFileSelected: (file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Document
      </h2>
      <div className="relative w-full">
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <label
          htmlFor="file-upload"
          className="block w-full text-center bg-blue-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Choose File
        </label>
      </div>
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600 italic">
          Uploaded: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;
