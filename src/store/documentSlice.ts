import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchDocuments, updateDocumentStatus } from "../utils/api";
import { Document } from "../types";

interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export const fetchAllDocuments = createAsyncThunk<Document[]>(
  "documents/fetchAll",
  async () => {
    const data = await fetchDocuments();
    return data;
  }
);

export const updateDocument = createAsyncThunk<
  Document,
  { id: string; status: "Pending" | "Signed" | "Declined" }
>("documents/update", async ({ id, status }) => {
  const updatedDoc = await updateDocumentStatus(id, status);
  return updatedDoc;
});

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDocuments.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch documents.";
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index].status = action.payload.status;
        }
      });
  },
});

export const { addDocument } = documentSlice.actions;
export default documentSlice.reducer;
