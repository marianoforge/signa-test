import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addDocument, fetchAllDocuments } from "../store/documentSlice";
import DocumentUpload from "../components/DocumentUpload";
import SignatureRequestForm from "../components/SignatureRequestForm";
import DocumentList from "../components/DocumentList";
import { notify, Notification } from "../components/Notification";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorComponent from "../components/ErrorComponent";

const HomePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector(
    (state: RootState) => state.documents
  );

  useEffect(() => {
    dispatch(fetchAllDocuments() as any);
  }, [dispatch]);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleSignatureRequest = (emails: string[]) => {
    if (selectedFile) {
      dispatch(
        addDocument({
          id: Date.now().toString(),
          name: selectedFile.name,
          status: "Pending",
        })
      );

      notify(
        `Uploaded "${selectedFile.name}" and sent request to: ${emails.join(
          ", "
        )}`
      );

      setSelectedFile(null);
    } else {
      notify("No file selected to send with the request.");
    }
  };

  if (loading)
    return (
      <div
        data-testid="loading-skeleton"
        className="flex flex-col items-center justify-center mt-10"
      >
        <Skeleton height={96} width={800} count={7} />
      </div>
    );
  if (error)
    return <ErrorComponent message={`Error loading documents: ${error}`} />;

  return (
    <div className="container mx-auto max-w-1920 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 mt-10">
        Document Management System
      </h1>
      <div className="space-y-8 w-1/2 mx-auto">
        <DocumentUpload onFileSelected={handleFileSelected} />
        <SignatureRequestForm onRequest={handleSignatureRequest} />
        <DocumentList documents={documents} />
      </div>
      <Notification />
    </div>
  );
};

export default HomePage;
