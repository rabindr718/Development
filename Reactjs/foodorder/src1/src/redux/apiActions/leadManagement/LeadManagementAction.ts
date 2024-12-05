import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export const getLeads = createAsyncThunk(
  'fetchLead/get_leads',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('get_leads_home_page', params, true);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getLeadById = createAsyncThunk(
  'fetchLead/get_leadById',
  async (leadId: number, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller(
        'get_lead_info',
        { leads_id: leadId },
        true
      );
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);


export const createProposal = createAsyncThunk(
  'proposal/aurora_create_proposal',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_create_proposal', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create proposal');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create proposal');
    }
  }
);

export const getProjectByLeadId = createAsyncThunk(
  'project/aurora_get_project',
  async (leadId: number, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_get_project', { leads_id: leadId }, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to fetch project data');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to fetch project data');
    }
  }
);

export const auroraCreateProject = createAsyncThunk(
  'project/aurora_create_project',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_create_project', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create project');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create project');
    }
  }
);

export const auroraCreateDesign = createAsyncThunk(
  'design/aurora_create_design',
  async (params: { leads_id: number }, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_create_design', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create design');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create design');
    }
  }
);

export const auroraCreateProposal = createAsyncThunk(
  'proposal/aurora_create_proposal',
  async (params: { leads_id: number }, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_create_proposal', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create proposal');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create proposal');
    }
  }
);

export const auroraGenerateWebProposal = createAsyncThunk(
  'proposal/auroraGenerateWebProposal',
  async (params: { leads_id: number }, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_generate_web_proposal',params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to Generate Web Proposal');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to Generate Web Proposal');
    }
  }
);

export const auroraWebProposal = createAsyncThunk(
  'proposal/aurora_retrieve_Web_Proposal',
  async (leadId: number, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_retrieve_Web_Proposal', { leads_id: leadId }, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to fetch Web Proposal');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to fetch Web Proposal');
    }
  }
);

export const auroraListModules = createAsyncThunk(
  'modules/auroraListModules',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('aurora_list_modules', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to fetch modules');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to fetch modules');
    }
  }
);

export const getDocuSignUrl = createAsyncThunk(
  'docuSign/get_docuSignUrl',
  async (params: any, { rejectWithValue }) => {
    try {
      // Assuming postCaller is properly set up to handle full URLs
      const response = await postCaller(`docusign_oauth`, params, true);
      
      // Check for a successful response
      if (response.status > 201) {
        return rejectWithValue(response.message || 'Failed to retrieve DocuSign URL');
      }
      
      // Assuming the URL will be in response.data.url based on your API design
      return response.data; // Return the data directly
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to retrieve DocuSign URL');
    }
  }
);


export const getDocuSignToken = createAsyncThunk(
  'docuSign/get_docuSignToken',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_docuSignToken', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to retrieve DocuSign token');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to retrieve DocuSign token');
    }
  }
);

export const getDocuSignUserInfo = createAsyncThunk(
  'docuSign/get_docuSignUserInfo',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_docuSignUserInfo', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to retrieve DocuSign user info');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to retrieve DocuSign user info');
    }
  }
);

export const createEnvelope = createAsyncThunk(
  'docuSign/createEnvelope',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('docusign_create_envelope', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create DocuSign envelope');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create DocuSign envelope');
    }
  }
);

export const createDocuSignRecipientView = createAsyncThunk(
  'docuSign/createRecipientView',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('docusign_create_recipient_view', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to create DocuSign recipient view');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to create DocuSign recipient view');
    }
  }
);

export const getDocument = createAsyncThunk(
  'docusign/getDocument',
  async (params: { leads_id: number; base_url: string }, { rejectWithValue }) => {
    try {
      const data = await postCaller('docusign_get_document', params, true);
      if (data.status > 201) {
        return rejectWithValue(data.message || 'Failed to retrieve DocuSign document');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Failed to retrieve DocuSign document');
    }
  }
);