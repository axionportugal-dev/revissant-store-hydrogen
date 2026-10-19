import * as React from 'react';
import ModalShell from './ModalShell';
import {ClockIcon, RefreshCcwIcon, ShieldCheckIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReturnsModal({isOpen, onClose}: Props) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-2xl" roundedClass="rounded-none">
      <div className="p-10 md:p-14 overflow-y-auto no-scrollbar">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-revissant-dark mb-4 tracking-tight">
            Return Policy
          </h2>
          <div className="w-16 h-0.5 bg-revissant-dark mx-auto opacity-20"></div>
        </div>

        <div className="space-y-12">
          <p className="text-center text-gray-500 font-light leading-relaxed">
            At Revissant, we pride ourselves on the quality of our products. If you are not completely satisfied with your purchase, we offer a seamless return process to ensure your peace of mind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-revissant-dark mb-4">
                <ClockIcon size={24} />
              </div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-2">30 Days</h4>
              <p className="text-xs text-gray-500">
                You have 30 days from the delivery date to initiate a return.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-revissant-dark mb-4">
                <RefreshCcwIcon size={24} />
              </div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-2">Free Returns</h4>
              <p className="text-xs text-gray-500">
                We provide a pre-paid shipping label for all domestic returns.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-revissant-dark mb-4">
                <ShieldCheckIcon size={24} />
              </div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-2">
                Original Condition
              </h4>
              <p className="text-xs text-gray-500">
                Items must be unused, unwashed, and in original packaging.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-none border border-gray-100">
            <h3 className="font-serif text-xl text-revissant-dark mb-6">How to Return</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="font-bold text-revissant-dark text-lg">01.</span>
                <div>
                  <span className="font-bold text-sm uppercase tracking-wide block mb-1">
                    Request a Return
                  </span>
                  <p className="text-xs text-gray-500">
                    Visit our "My Orders" section or contact support at help@revissant.com to request a return authorization.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <span className="font-bold text-revissant-dark text-lg">02.</span>
                <div>
                  <span className="font-bold text-sm uppercase tracking-wide block mb-1">
                    Pack Your Item
                  </span>
                  <p className="text-xs text-gray-500">
                    Place the item securely in its original packaging and attach the provided prepaid shipping label.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <span className="font-bold text-revissant-dark text-lg">03.</span>
                <div>
                  <span className="font-bold text-sm uppercase tracking-wide block mb-1">
                    Ship & Refund
                  </span>
                  <p className="text-xs text-gray-500">
                    Drop off the package at the nearest carrier location. Once inspected, we will issue a full refund to your original payment method within 5-7 business days.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-revissant-dark text-white px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-lg rounded-none"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
