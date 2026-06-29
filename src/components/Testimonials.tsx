import React, { useState } from 'react';
import { Star, MessageSquare, Plus, Check } from 'lucide-react';
import { Language, Review } from '../types';
import { translations } from '../translations';
import { INITIAL_REVIEWS } from '../data';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Review form states
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isPosted, setIsPosted] = useState(false);

  const t = translations[lang];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: Review = {
      id: "rev-" + Date.now(),
      name: name,
      city: city || (lang === 'en' ? "Cameroon" : "Cameroun"),
      rating: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setIsPosted(true);
    
    // reset form
    setTimeout(() => {
      setName('');
      setCity('');
      setComment('');
      setRating(5);
      setIsFormOpen(false);
      setIsPosted(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="relative py-20 bg-white border-y border-emerald-100/60">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
              {t.navTestimonials}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-emerald-950 tracking-tight">
              {t.testTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-semibold">
              {t.testSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
          >
            <Plus className={`w-4 h-4 transform ${isFormOpen ? 'rotate-45' : ''} transition-transform text-emerald-600`} />
            <span>{t.testPlaceholderReviewer}</span>
          </button>
        </div>

        {/* Post a Review Collapse Panel */}
        {isFormOpen && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100 max-w-xl mx-auto animate-scaleUp shadow-sm">
            {!isPosted ? (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <h3 className="text-base font-display font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>{t.testPlaceholderReviewer}</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5">{t.testLabelName} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marie N."
                      className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5">{t.testLabelCity}</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bastos, Yaoundé"
                      className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Star rating selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5">{t.testRatingLabel}</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-yellow-500 hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${rating >= star ? 'fill-yellow-500 text-yellow-500' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment box */}
                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5">{t.testLabelComment} *</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the results..."
                    rows={3}
                    className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t.testSubmitReview}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-sm font-bold text-emerald-800">Review Submitted Successfully!</h4>
                <p className="text-xs text-slate-500 font-semibold">Thank you for sharing your experience with us.</p>
              </div>
            )}
          </div>
        )}

        {/* Testimonial Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-sm"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                    />
                  ))}
                </div>

                {/* Text comment */}
                <p className="text-sm text-slate-700 leading-relaxed italic font-medium">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author details */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
                <div>
                  <div className="font-extrabold text-slate-900 font-sans text-sm">{rev.name}</div>
                  <div className="text-slate-500 mt-0.5">{rev.city}</div>
                </div>
                <span className="text-[10px] text-slate-400 font-bold shrink-0">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
