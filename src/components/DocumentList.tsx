import React from "react";

interface Document {
  id: string;
  name: string;
  status: "Pending" | "Signed" | "Declined";
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Signed: "bg-green-100 text-green-700",
    Declined: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Document Status
      </h2>
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
          >
            <span className="font-medium text-gray-800">{doc.name}</span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                statusStyles[doc.status]
              }`}
            >
              {doc.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
