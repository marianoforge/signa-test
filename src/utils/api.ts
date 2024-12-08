import mockData from "../mocks/data.json";
import { Document } from "../types";

export const fetchDocuments = async (): Promise<Document[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData.documents as Document[]), 500);
  });
};

export const updateDocumentStatus = async (
  id: string,
  status: "Pending" | "Signed" | "Declined"
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    const document = (mockData.documents as Document[]).find(
      (doc) => doc.id === id
    );
    if (document) {
      document.status = status;
      setTimeout(() => resolve(document), 500);
    } else {
      setTimeout(() => reject(new Error("Document not found")), 500);
    }
  });
};
