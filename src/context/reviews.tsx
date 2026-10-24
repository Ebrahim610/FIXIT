import { createContext, ReactNode, useContext, useState } from 'react';
import { Review, REVIEWS } from '@/data/reviews';

type ReviewsValue = {
  reviews: Review[];
  reviewsFor: (technicianId: string) => Review[];
  addReview: (technicianId: string, rating: number, comment: string, author: string) => void;
  replyToReview: (id: string, reply: string) => void;
};

const ReviewsContext = createContext<ReviewsValue | null>(null);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const reviewsFor = (technicianId: string) => reviews.filter((r) => r.technicianId === technicianId);

  const addReview = (technicianId: string, rating: number, comment: string, author: string) => {
    const created: Review = { id: `r${Date.now()}`, technicianId, rating, comment, author };
    setReviews((current) => [created, ...current]);
  };

  const replyToReview = (id: string, reply: string) => {
    setReviews((current) => current.map((r) => (r.id === id ? { ...r, reply } : r)));
  };

  return (
    <ReviewsContext.Provider value={{ reviews, reviewsFor, addReview, replyToReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used inside ReviewsProvider');
  return ctx;
}
