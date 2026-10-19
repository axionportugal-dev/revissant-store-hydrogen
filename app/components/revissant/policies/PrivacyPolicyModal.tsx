import * as React from 'react';
import ModalShell from './ModalShell';
import {CookieIcon, DatabaseIcon, EyeIcon, LockIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PrivacyPolicyModal({isOpen, onClose}: Props) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-2xl" roundedClass="rounded-sm">
      <div className="p-10 md:p-14 overflow-y-auto no-scrollbar">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-revissant-dark mb-4 tracking-tight">
            Privacy Policy
          </h2>
          <div className="w-16 h-0.5 bg-revissant-dark mx-auto opacity-20"></div>
        </div>

        <div className="space-y-12">
          <p className="text-center text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
            Your privacy is paramount to Revissant. We are committed to protecting your personal data and ensuring transparency in how we handle your information.
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <DatabaseIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  Data Collection
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This includes your name, email address, shipping address, and payment details.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <EyeIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  How We Use Data
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We use your information to process transactions, send order updates, and personalize your shopping experience. We do not sell your personal data to third parties.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <LockIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  Security
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We implement industry-standard security measures, including SSL encryption, to protect your data during transmission and storage.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <CookieIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  Cookies
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We use cookies to analyze site traffic and remember your preferences. You can control cookie settings through your browser at any time.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-revissant-dark text-white px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
