import * as React from 'react';
import ModalShell from './ModalShell';
import {AlertCircleIcon, FileTextIcon, ScaleIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TermsModal({isOpen, onClose}: Props) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-3xl" roundedClass="rounded-sm">
      <div className="p-10 md:p-14 overflow-y-auto no-scrollbar">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-revissant-dark mb-4 tracking-tight">
            Terms & Conditions
          </h2>
          <div className="w-16 h-0.5 bg-revissant-dark mx-auto opacity-20"></div>
        </div>

        <div className="space-y-12">
          <p className="text-center text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
            This website is operated by Revissant. Throughout the site, the terms “we”, “us” and “our” refer to Revissant. Revissant offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <FileTextIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  Online Store Terms
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <ScaleIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  General Conditions
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-revissant-dark">
                <AlertCircleIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-2 text-revissant-dark">
                  Modifications to Service & Prices
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
              <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-revissant-dark">
                Products or Services
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-revissant-dark text-white px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-lg"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
