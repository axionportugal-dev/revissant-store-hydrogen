import * as React from 'react';
import ModalShell from './ModalShell';
import {GlobeIcon, PackageCheckIcon, ZapIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DeliveryModal({isOpen, onClose}: Props) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-3xl" roundedClass="rounded-none">
      <div className="p-10 md:p-14 overflow-y-auto no-scrollbar">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-revissant-dark mb-4 tracking-tight">
            Shipping & Delivery
          </h2>
          <div className="w-16 h-0.5 bg-revissant-dark mx-auto opacity-20"></div>
        </div>

        <div className="space-y-12">
          <p className="text-center text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
            We ensure your items arrive safely and on time. We ship to over 50 countries worldwide using trusted partners including DHL, FedEx, and UPS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-none border border-gray-100 flex flex-col items-center text-center hover:border-blue-200 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-revissant-dark mb-4 shadow-sm">
                <ZapIcon size={24} />
              </div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-1 text-revissant-dark">
                Express
              </h4>
              <span className="text-revissant-dark font-bold text-xs mb-3">$15.00</span>
              <p className="text-xs text-gray-500 leading-relaxed">
                Delivery within 1-2 business days.
                <br />
                Order before 2 PM for same-day dispatch.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-none border border-gray-100 flex flex-col items-center text-center hover:border-blue-200 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-revissant-dark mb-4 shadow-sm">
                <GlobeIcon size={24} />
              </div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-1 text-revissant-dark">
                Global
              </h4>
              <span className="text-revissant-dark font-bold text-xs mb-3">
                CALCULATED AT CHECKOUT
              </span>
              <p className="text-xs text-gray-500 leading-relaxed">
                Delivery within 5-10 business days.
                <br />
                Duties and taxes included.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center border-t border-gray-100 pt-10">
            <div className="bg-revissant-dark text-white p-4 rounded-full">
              <PackageCheckIcon size={32} strokeWidth={1.5} />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-xl text-revissant-dark mb-2">Order Tracking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Once your order is dispatched, you will receive a confirmation email containing your tracking number and a link to monitor your shipment&apos;s journey in real-time.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="whitespace-nowrap bg-white border border-revissant-dark text-revissant-dark px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-revissant-dark hover:text-white transition-colors rounded-none"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
