import { useState, useEffect } from 'react';
import { billService } from '../services/billService';

export function useTimeline(billId) {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!billId) return;
    
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    billService.getBillTimeline(billId)
      .then(data => {
        if (isMounted) {
          setTimeline(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || "Failed to load timeline.");
          setLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [billId]);

  return { timeline, loading, error };
}

export default useTimeline;
