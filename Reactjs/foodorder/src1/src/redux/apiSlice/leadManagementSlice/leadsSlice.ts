import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getLeadById,
  getLeads,
  auroraCreateProject,
  auroraCreateDesign,
  auroraCreateProposal,
  getProjectByLeadId,
  auroraWebProposal,
  auroraGenerateWebProposal,
  auroraListModules,
  getDocuSignUrl,
  createEnvelope,
  createDocuSignRecipientView,
  getDocument
} from '../../apiActions/leadManagement/LeadManagementAction';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  leadsData: any[];
  statusData1:any[];
  leadDetail: any;
  isSuccess: boolean;
  totalcount: number;
  proposalData: any;
  projectData: any;
  designData: any;
  webProposalData: any;
  genProposalUrl: any;
  moduleData: any[];
  docuSignData: any;
  envelopeData: any;
  recipientViewUrl: string;
  documentData: any;
}

const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  leadsData: [],
  statusData1:[],
  leadDetail: {},
  isSuccess: false,
  totalcount: 0,
  proposalData: {},
  projectData: {},
  designData: {},
  webProposalData: {},
  genProposalUrl:{},
  moduleData:[],
  docuSignData: {},
  envelopeData: {},
  recipientViewUrl: '',
  documentData: null,
};

const leadManagementSlice = createSlice({
  name: 'leadManagmentSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadsData = action.payload.data?.leads_data || [];
        state.statusData1 = action.payload.data?.status_counts || [];
        state.totalcount = action.payload.dbRecCount || 0;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(getLeadById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadsData = action.payload.data || {};
        state.totalcount = action.payload.dbRecCount || 0;
        toast.success(action.payload.message)
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // New cases for auroraCreateProject
      .addCase(auroraCreateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraCreateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectData = action.payload.data || {};
      })
      .addCase(auroraCreateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // New cases for auroraCreateDesign
      .addCase(auroraCreateDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraCreateDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.designData = action.payload.data || {};
      })
      .addCase(auroraCreateDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // New cases for auroraCreateProposal
      .addCase(auroraCreateProposal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraCreateProposal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proposalData = action.payload.data || {};
      })
      .addCase(auroraCreateProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // Existing cases for getProjectByLeadId
      .addCase(getProjectByLeadId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectByLeadId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectData = action.payload.data || {};
        toast.success(action.payload.message);
      })
      .addCase(getProjectByLeadId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // New cases for auroraWebProposal
      .addCase(auroraWebProposal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraWebProposal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.webProposalData = action.payload.data || {};
      })
      .addCase(auroraWebProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // New cases for getWebProposal
      .addCase(auroraGenerateWebProposal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraGenerateWebProposal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genProposalUrl = action.payload.data || {};
      })
      .addCase(auroraGenerateWebProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

       // New cases for auroraListModules
       .addCase(auroraListModules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auroraListModules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moduleData = action.payload.data || [];
      })
      .addCase(auroraListModules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      // New cases for DocuSign actions
      .addCase(getDocuSignUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuSignUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.docuSignData = action.payload.data || {};
        toast.success('DocuSign URL retrieved successfully!');
      })
      .addCase(getDocuSignUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
       // New cases for createEnvelope
       .addCase(createEnvelope.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnvelope.fulfilled, (state, action) => {
        state.isLoading = false;
        state.envelopeData = action.payload.data || {};
        toast.success('DocuSign envelope created successfully!');
      })
      .addCase(createEnvelope.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
       
      // New cases for createDocuSignRecipientView
      .addCase(createDocuSignRecipientView.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDocuSignRecipientView.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipientViewUrl = action.payload.data.url; // Update state with the returned URL
        toast.success('DocuSign recipient view created successfully!');
      })
      .addCase(createDocuSignRecipientView.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Type assertion for error
        toast.error(action.payload as string); // Error notification
      })

      .addCase(getDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.data || null; // Store the document data
        toast.success('DocuSign document retrieved successfully!'); // Success notification
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Handle error
        toast.error(action.payload as string); // Error notification
      });
      
      
  },
});

export const { resetSuccess } = leadManagementSlice.actions;

export default leadManagementSlice.reducer;
