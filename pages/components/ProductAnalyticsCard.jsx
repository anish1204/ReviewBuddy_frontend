import React from 'react'

const ProductAnalyticsCard = ({ product }) => {
  const total = product.feedbacks.length;
  const stats = product.sentimentStats;

  return (
    <div className="border rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>₹ {product.amount}</p>

      <div className="mt-2">
        <p>👍 Positive: {stats.positive}</p>
        <p>😐 Neutral: {stats.neutral}</p>
        <p>👎 Negative: {stats.negative}</p>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Total Reviews: {total}
      </p>

      <button className="mt-3 text-blue-600">
        View Feedbacks
      </button>
    </div>
  );
}

export default ProductAnalyticsCard