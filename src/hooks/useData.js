import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const useData = (isAuthenticated) => {
  const [subjects, setSubjects] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await dataService.getSubjects();
      // Transform backend data to match frontend expectations
      const transformedSubjects = Array.isArray(data) ? data.map(subject => ({
        id: subject._id,
        name: subject.name,
        displayName: subject.displayName || subject.name,
        description: subject.description || `${subject.name} study materials`,
        freeContent: subject.freeContent || 0,
        paidContent: subject.paidContent || 0,
        totalQuestions: subject.totalQuestions || 0
      })) : [];
      setSubjects(transformedSubjects);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to load subjects');
      // Fallback to mock data if needed
    
    } finally {
      setLoading(false);
    }
  };

  // Fetch bundles
  const fetchBundles = async () => {
    try {
      const data = await dataService.getBundles();
      const transformedBundles = Array.isArray(data) ? data.map(bundle => ({
        id: bundle._id,
        _id: bundle._id,
        name: bundle.name || bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
        title: bundle.title || bundle.name || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
        description: bundle.description,
        price: bundle.price,
        products: bundle.products,
        departmentID: bundle.departmentID,
        departmentName: bundle.departmentID?.department || 'Unknown Department'
      })) : [];
      setBundles(transformedBundles);
    } catch (err) {
      console.error('Failed to fetch bundles:', err);
      setBundles([]);
    }
  };

  // Fetch question banks
  const fetchQuestionBanks = async () => {
    try {
      const data = await dataService.getQuestionBanks();
      const transformedQuestionBanks = Array.isArray(data) ? data.map(qb => ({
        id: qb._id,
        title: qb.title,
        subject: qb.subjectID,
        type: qb.type || 'paid',
        price: qb.price || 0,
        questions: qb.questions || 50,
        duration: qb.duration || 120,
        difficulty: qb.difficulty || 'intermediate',
        downloadCount: qb.downloadCount || 0,
        rating: qb.rating || 4.0,
        fileUrl: qb.fileUrl
      })) : [];
      setQuestionBanks(transformedQuestionBanks);
    } catch (err) {
      console.error('Failed to fetch question banks:', err);
      // Fallback to mock data
      
    }
  };

  // Fetch question banks by subject
  const fetchQuestionBanksBySubject = async (subjectID) => {
    try {
      const data = await dataService.getQuestionBanksBySubject(subjectID);
      return Array.isArray(data) ? data : [data];
    } catch (err) {
      console.error('Failed to fetch question banks by subject:', err);
      return [];
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubjects();
      fetchBundles();
      fetchQuestionBanks();
    }
  }, [isAuthenticated]);

  return {
    subjects,
    bundles,
    questionBanks,
    loading,
    error,
    refetch: {
      subjects: fetchSubjects,
      bundles: fetchBundles,
      questionBanks: fetchQuestionBanks
    },
    fetchQuestionBanksBySubject
  };
};