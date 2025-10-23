import api from '../config/api';

export const dataService = {
  // Get all subjects
  getSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data;
  },

  // Get all bundles
  getBundles: async () => {
    const response = await api.get('/bundles');
    return response.data;
  },

  // Get all question banks (accessible by user through admin-granted access)
  getQuestionBanks: async () => {
    const response = await api.post('/question-banks');
    return response.data;
  },

  // Get question banks by subject
  getQuestionBanksBySubject: async (subjectID) => {
    const response = await api.post('/question-banks/by-subject', { subjectID });
    return response.data;
  },

  // Get sample PDFs by department (public access)
  getSamplePdfsByDepartment: async (departmentID) => {
    const response = await api.post('/question-banks/by-department', { departmentID });
    return response.data;
  },

  // Get bundle by department
  getBundleByDepartment: async (departmentID) => {
    const response = await api.post('/bundles/byDepartment', { departmentID });
    return response.data;
  },

  // Get PDFs/products by department from bundle
  getPdfsByDepartment: async (departmentID) => {
    const response = await api.post('/bundles/getPdfByDepartment', { departmentID });
    return response.data;
  },

  // Get subjects by department from bundle
  getSubjectsByDepartment: async (departmentID) => {
    const response = await api.post('/bundles/getSubjectByDepartment', { departmentID });
    return response.data;
  },

  // Get user's accessible bundles (granted by admin)
  getUserAccess: async () => {
    const response = await api.get('/access/my-access');
    return response.data;
  },

  // Get access details for a specific bundle
  getAccessDetails: async (bundleId) => {
    const response = await api.get(`/access/details/${bundleId}`);
    return response.data;
  },

  // Submit access request
  submitAccessRequest: async (requestData) => {
    const response = await api.post('/access-requests/request', requestData);
    return response.data;
  },

  // Get user's access requests
  getUserAccessRequests: async () => {
    const response = await api.get('/access-requests/my-requests');
    return response.data;
  }
};
