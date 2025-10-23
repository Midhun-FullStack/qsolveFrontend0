import { createSlice } from '@reduxjs/toolkit';
import { dataService } from '../../services/dataService';

const initialState = {
  subjects: [],
  bundles: [],
  questionBanks: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setBundles: (state, action) => {
      state.bundles = action.payload;
    },
    setQuestionBanks: (state, action) => {
      state.questionBanks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSubjects, setBundles, setQuestionBanks, setLoading, setError } = dataSlice.actions;

// Thunks
export const fetchSubjects = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await dataService.getSubjects();
    const transformedSubjects = Array.isArray(data) ? data.map(subject => ({
      id: subject._id,
      name: subject.name,
      displayName: subject.displayName || subject.name,
      description: subject.description || `${subject.name} study materials`,
      freeContent: subject.freeContent || 0,
      paidContent: subject.paidContent || 0,
      totalQuestions: subject.totalQuestions || 0
    })) : [];
    dispatch(setSubjects(transformedSubjects));
  } catch (err) {
    console.error('Failed to fetch subjects:', err);
    dispatch(setError('Failed to load subjects'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBundles = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await dataService.getBundles();
    const transformedBundles = Array.isArray(data) ? data.map(bundle => ({
      id: bundle._id,
      name: bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
      title: bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
      price: bundle.price || 0,
      rating: 4.5 + Math.random() * 0.5, // Mock rating for display
      description: bundle.description || `Comprehensive study materials for ${bundle.departmentID?.department || 'this subject'} with detailed explanations and practice questions.`,
      products: bundle.products || [],
      departmentID: bundle.departmentID?._id || bundle.departmentID,
      departmentName: bundle.departmentID?.department || 'Unknown Department'
    })) : [];
    
    // If no bundles from API, use default bundles for demo
    if (transformedBundles.length === 0) {
      const defaultBundles = [
        {
          id: 'demo-1',
          name: 'JEE Main Complete Package',
          title: 'JEE Main Complete Package',
          price: 2999,
          rating: 4.8,
          description: 'Comprehensive JEE Main preparation with 5000+ practice questions, detailed solutions, and expert video explanations.',
          departmentName: 'Engineering'
        },
        {
          id: 'demo-2',
          name: 'NEET Biology Mastery',
          title: 'NEET Biology Mastery',
          price: 2499,
          rating: 4.6,
          description: 'Complete biology preparation for NEET with detailed notes, diagrams, and practice questions.',
          departmentName: 'Medical'
        },
        {
          id: 'demo-3',
          name: 'Mathematics Fundamentals',
          title: 'Mathematics Fundamentals',
          price: 1999,
          rating: 4.5,
          description: 'Essential mathematics concepts with step-by-step solutions and practice problems.',
          departmentName: 'Mathematics'
        }
      ];
      dispatch(setBundles(defaultBundles));
    } else {
      dispatch(setBundles(transformedBundles));
    }
  } catch (err) {
    console.error('Failed to fetch bundles:', err);
    // Fallback to default bundles on error
    const defaultBundles = [
      {
        id: 'demo-1',
        name: 'JEE Main Complete Package',
        title: 'JEE Main Complete Package',
        price: 2999,
        rating: 4.8,
        description: 'Comprehensive JEE Main preparation with 5000+ practice questions, detailed solutions, and expert video explanations.',
        departmentName: 'Engineering'
      },
      {
        id: 'demo-2',
        name: 'NEET Biology Mastery',
        title: 'NEET Biology Mastery',
        price: 2499,
        rating: 4.6,
        description: 'Complete biology preparation for NEET with detailed notes, diagrams, and practice questions.',
        departmentName: 'Medical'
      },
      {
        id: 'demo-3',
        name: 'Mathematics Fundamentals',
        title: 'Mathematics Fundamentals',
        price: 1999,
        rating: 4.5,
        description: 'Essential mathematics concepts with step-by-step solutions and practice problems.',
        departmentName: 'Mathematics'
      }
    ];
    dispatch(setBundles(defaultBundles));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchQuestionBanks = () => async (dispatch) => {
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
    dispatch(setQuestionBanks(transformedQuestionBanks));
  } catch (err) {
    console.error('Failed to fetch question banks:', err);
  }
};

export const fetchQuestionBanksBySubject = (subjectID) => async () => {
  try {
    const data = await dataService.getQuestionBanksBySubject(subjectID);
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    console.error('Failed to fetch question banks by subject:', err);
    return [];
  }
};

export default dataSlice.reducer;
