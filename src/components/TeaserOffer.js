import React, { useState, useEffect } from 'react';
import { getTeaserOffer } from '../api';

function TeaserOffer({ amount, currency, token }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getTeaserOffer(amount, currency, token);
        setOffer(data);
        setError(null);
      } catch (err) {
        setError('Could not retrieve offers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [amount, currency, token]);

  if (loading) {
    return <p className="text-gray-500">Loading offers...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!offer) {
    return null; // Don't render anything if there's no offer
  }

  const formattedInstallment = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: offer.currency,
  }).format(offer.monthlyInstallment);


  return (
    <div className="text-center p-2 bg-gray-100 rounded-md my-4">
      <p className="text-sm text-gray-800">
        From <span className="font-bold">{formattedInstallment}/month</span> for {offer.tenure} months with
        <span className="font-semibold text-orange-500"> NdasendaPay</span>
      </p>
    </div>
  );
}

export default TeaserOffer;
