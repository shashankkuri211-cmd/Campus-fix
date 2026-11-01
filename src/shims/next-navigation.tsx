import React, { createContext, useContext, useEffect, useState } from 'react';

interface NavigationContextValue {
  pathname: string;
  navigate: (to: string, replace?: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  pathname: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
  navigate: (to: string, replace?: boolean) => {
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  },
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPathname(to.split('?')[0] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ pathname, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function usePathname(): string {
  return useContext(NavigationContext).pathname;
}

export function useRouter() {
  const { navigate } = useContext(NavigationContext);
  return {
    push: (href: string) => navigate(href, false),
    replace: (href: string) => navigate(href, true),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => {},
    prefetch: () => {},
  };
}

export function redirect(href: string): never {
  if (typeof window !== 'undefined') {
    window.history.replaceState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  throw new Error(`NEXT_REDIRECT:${href}`);
}
