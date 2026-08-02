import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

export function useProfileComparison(token, billId) {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComparisons = () => {
    if (!token || !billId) return;
    
    setLoading(true);
    setError(null);
    
    profileService.compareProfiles(token, billId)
      .then(data => {
        setComparisons(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to load comparisons.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComparisons();
  }, [token, billId]);

  return { comparisons, loading, error, refetch: fetchComparisons };
}

export default useProfileComparison;
