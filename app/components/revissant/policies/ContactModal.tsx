import * as React from 'react';
import ModalShell from './ModalShell';
import {CheckIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({isOpen, onClose}: Props) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    window.setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-2xl" roundedClass="rounded-none">
      <div className="p-10 md:p-14">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-revissant-dark mb-4 tracking-tight">
            Contact Us
          </h2>
          <p className="text-gray-500 text-sm font-light max-w-md mx-auto">
            Don&apos;t hesitate to contact us if you have any questions or proposals at{' '}
            <span className="font-bold text-revissant-dark">help@revissant.com</span>
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="revissant-form space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                required
                placeholder="YOUR NAME"
                className="w-full border border-gray-200 p-4 text-revissant-dark outline-none focus:border-revissant-dark focus:ring-1 focus:ring-revissant-dark transition-all placeholder:text-gray-400 text-xs font-bold tracking-widest rounded-none bg-gray-50/30"
              />
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                className="w-full border border-gray-200 p-4 text-revissant-dark outline-none focus:border-revissant-dark focus:ring-1 focus:ring-revissant-dark transition-all placeholder:text-gray-400 text-xs font-bold tracking-widest rounded-none bg-gray-50/30"
              />
            </div>

            <input
              type="tel"
              placeholder="YOUR PHONE (OPTIONAL)"
              className="w-full border border-gray-200 p-4 text-revissant-dark outline-none focus:border-revissant-dark focus:ring-1 focus:ring-revissant-dark transition-all placeholder:text-gray-400 text-xs font-bold tracking-widest rounded-none bg-gray-50/30"
            />

            <textarea
              required
              rows={5}
              placeholder="YOUR MESSAGE"
              className="w-full border border-gray-200 p-4 text-revissant-dark outline-none focus:border-revissant-dark focus:ring-1 focus:ring-revissant-dark transition-all placeholder:text-gray-400 text-xs font-bold tracking-widest resize-none rounded-none bg-gray-50/30"
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-revissant-dark text-white font-bold py-4 uppercase tracking-[0.2em] hover:bg-[#1a3a6e] transition-colors shadow-lg text-sm rounded-none"
              >
                Send Message
              </button>
            </div>
          </form>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center animate-fade-in text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 border border-green-100">
              <CheckIcon size={40} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-serif text-revissant-dark mb-2">
              Message Sent Successfully
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Thank you for reaching out. Our team will get back to you shortly.
            </p>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
