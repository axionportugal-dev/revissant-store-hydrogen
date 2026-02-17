import {useState, type FormEvent} from 'react';
import {Aside, useAside} from '~/components/Aside';
import {XIcon} from '~/components/revissant/ui/icons';

export function RevissantAccountAside() {
  const {close} = useAside();
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    close();
    window.location.assign('/account/login');
  };

  return (
    <Aside
      type="account"
      heading=""
      showHeader={false}
      overlayClassName="flex items-center justify-center p-4 !bg-black/60"
      panelClassName="!w-full !max-w-md !mt-0 !border-0 rounded-none animate-fade-in flex flex-col"
    >
      <div className="relative">
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
        >
          <XIcon size={20} className="text-revissant-dark" />
        </button>

        <div className="p-10 md:p-12 text-center">
          <h2 className="font-serif text-3xl text-revissant-dark mb-2 tracking-wide uppercase">
            {authMode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-8">
            {authMode === 'LOGIN'
              ? 'Access your personal collection'
              : 'Join the world of Revissant'}
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-revissant-dark ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border-b border-gray-300 py-3 px-2 text-revissant-dark outline-none focus:border-revissant-dark transition-colors bg-transparent placeholder-gray-300 rounded-none"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-revissant-dark ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border-b border-gray-300 py-3 px-2 text-revissant-dark outline-none focus:border-revissant-dark transition-colors bg-transparent placeholder-gray-300 rounded-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-revissant-dark text-white font-bold py-4 uppercase tracking-[0.2em] hover:bg-[#1a3a6e] transition-colors shadow-lg text-xs mt-4 rounded-none"
            >
              {authMode === 'LOGIN' ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">
              {authMode === 'LOGIN'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <button
              onClick={() =>
                setAuthMode(authMode === 'LOGIN' ? 'REGISTER' : 'LOGIN')
              }
              className="text-revissant-dark font-bold text-xs uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              {authMode === 'LOGIN' ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </Aside>
  );
}
