'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from '@erist-opt/shadcn/components/ui/use-toast';
import { createFeedback } from '../lib/actions';
import SvgInstagram from './Icons/Instagram';
import SvgTelegram from './Icons/Telegram';
import SvgWA from './Icons/whatsapp';
import SvgTelegramColor from './Icons/Telegram_Color';

export default function FeedbackButton() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const feedbackHideTime = localStorage.getItem('feedbackHideTime');
    if (feedbackHideTime) {
      const hideUntil = new Date(feedbackHideTime).getTime();
      const now = new Date().getTime();

      if (now < hideUntil) {
        setFeedbackSent(true);
        const remaining = hideUntil - now;
        setRemainingTime(Math.ceil(remaining / 1000 / 60)); // В минутах
        setTimeout(() => setFeedbackSent(false), remaining);
      } else {
        localStorage.removeItem('feedbackHideTime');
      }
    }
    setIsLoading(false);
  }, []);

  const handleFeedbackSubmit = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append('text', feedbackText);

      const result = await createFeedback({}, formData);
      if (result) {
        toast({
          title: 'Запрос отправлен, отследить статус можно в личном кабинете',
          duration: 1500,
        });
        setFeedbackSent(true);
        setShowFeedback(false);
        setFeedbackText('');

        const hideUntil = new Date(Date.now() + 1800000);
        localStorage.setItem('feedbackHideTime', hideUntil.toString());
        setRemainingTime(30);

        setTimeout(() => setFeedbackSent(false), 1800000);
      } else {
        toast({
          title: 'Ошибка отправки запроса',
          description: 'Попробуйте позже.',
          duration: 1500,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gray-300 animate-pulse flex items-center justify-center shadow-lg">
        ⏳
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-10 right-10">
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center shadow-lg hover:bg-gray-600 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </div>

        {showOptions && (
          <div className="absolute flex flex-col items-center gap-3 -top-40 ">
            <a
              href="https://t.me/erist_store_chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full  text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
            >
              <SvgTelegramColor />
            </a>
            <a
              href="https://wa.me/79122701666?text=Здравствуйте, "
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full  text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition"
            >
              <SvgWA />
            </a>
            <button
              onClick={() => setShowFeedback(true)}
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-600 transition"
            >
              ❔
            </button>
          </div>
        )}
      </div>

      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Обратная связь</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                className="w-full p-4 border border-gray-300 mb-4"
                rows={4}
                placeholder="Введите ваш запрос..."
                value={feedbackText}
                name="text"
                onChange={(e) => setFeedbackText(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2"
                  onClick={() => setShowFeedback(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2"
                  disabled={isPending}
                >
                  {isPending ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
