import React, { useState } from 'react';

export default function FeedbackForm({ feedbacks }: { feedbacks: any[] }) {
  // Хранит ID раскрытого запроса
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  let count = feedbacks.length;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Мои запросы:</h2>

      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="flex flex-col gap-4 mb-6">
          <div
            className="w-full cursor-pointer bg-gray-100 p-4 shadow-sm"
            onClick={() => toggleExpand(feedback.id)}
          >
            <div className="flex justify-between">
              <span className={`p-2 rounded`}>Запрос: {count--}</span>

              <span
                className={`p-2 rounded ${
                  feedback.status ? 'bg-green-200' : ' bg-red-200'
                }`}
              >
                {feedback.status ? 'Закрыт' : 'Открыт'}
              </span>
            </div>
          </div>

          {expandedId === feedback.id && (
            <div className="pb-4 border-b border-gray-300">
              <div className="w-full">
                {/* <label className="block text-gray-700">Текст Запроса</label> */}
                <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full">
                  {feedback.text}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
