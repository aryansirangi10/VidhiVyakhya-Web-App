import { useState, useEffect } from 'react';
import { billService } from '../services/billService';

export function useBillMetadata(billId) {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!billId) return;
    
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    billService.getBillMetadata(billId)
      .then(data => {
        if (isMounted) {
          setMetadata(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || "Failed to load metadata.");
          setLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [billId]);

  return { metadata, loading, error };
}

export default useBillMetadata;
