'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface UmamiContextType {
  isLoaded: boolean;
  track: (eventName: string, eventData?: Record<string, any>) => Promise<void>;
  trackAndNavigate: (
    eventName: string,
    url: string,
    eventData?: Record<string, any>,
  ) => void;
  identify: (userData: Record<string, any>) => Promise<void>;
}

const UmamiContext = createContext<UmamiContextType | undefined>(undefined);

interface UmamiProviderProps {
  children: ReactNode;
  websiteId?: string;
  hostUrl?: string;
  autoTrack?: boolean;
  excludeSearch?: boolean;
  domains?: string;
}

export const UmamiProvider = ({
  children,
  websiteId,
  hostUrl,
  autoTrack = true,
  excludeSearch = false,
  domains = '',
}: UmamiProviderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const initializeUmami = async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    // If umami is already defined or script is already loaded, just set state
    if (window.umami || document.querySelector('script[data-website-id]')) {
      setIsLoaded(true);
      return;
    }

    // Implement the key parts from the minified script
    try {
      // Get browser details
      const { screen, navigator, location, localStorage, document, history } =
        window;
      const { hostname, href } = location;
      const { referrer } = document;
      const screenSize = `${screen.width}x${screen.height}`;
      const language = navigator.language;

      // Configure endpoints
      const apiUrl = `${hostUrl}/api/send`;

      // State for tracking
      let currentUrl = cleanUrl(href);
      let currentRef = referrer !== hostname ? referrer : '';
      let currentTitle = document.title;
      let cache: string | undefined;
      let initialized = false;

      // Helper functions
      function encodeText(text: string): string {
        if (!text) return text;
        try {
          const decoded = decodeURI(text);
          if (decoded !== text) return decoded;
        } catch (e) {
          console.error(e);
          return text;
        }
        return encodeURI(text);
      }

      function cleanUrl(url: string): string {
        try {
          const { pathname, search } = new URL(url);
          url = pathname + search;
        } catch {}

        return excludeSearch ? url.split('?')[0] : url;
      }

      function getPayload() {
        return {
          website: websiteId,
          hostname,
          screen: screenSize,
          language,
          title: encodeText(currentTitle),
          url: encodeText(currentUrl),
          referrer: encodeText(currentRef),
        };
      }

      function handlePush(
        _: any,
        __: any,
        url: string | URL | null | undefined,
      ) {
        if (url) {
          currentRef = currentUrl;
          currentUrl = cleanUrl(url.toString());

          if (currentUrl !== currentRef) {
            setTimeout(() => trackEvent(), 300);
          }
        }
      }

      function isExcluded() {
        return (
          !websiteId ||
          (localStorage && localStorage.getItem('umami.disabled')) ||
          (domains &&
            !domains
              .split(',')
              .map((d) => d.trim())
              .includes(hostname))
        );
      }

      async function sendToServer(payload: any, type = 'event') {
        if (isExcluded()) return;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (cache !== undefined) {
          headers['x-umami-cache'] = cache;
        }

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ type, payload }),
            headers,
          });
          const text = await response.text();
          cache = text;
          return text;
        } catch (e) {
          console.error('Umami tracking error:', e);
        }
      }

      function trackEvent(
        eventNameOrData?:
          | string
          | object
          | ((payload: Record<string, any>) => Record<string, any>),
        eventData?: Record<string, any>,
      ) {
        let payload;

        if (typeof eventNameOrData === 'string') {
          payload = {
            ...getPayload(),
            name: eventNameOrData,
            data: typeof eventData === 'object' ? eventData : undefined,
          };
        } else if (typeof eventNameOrData === 'object') {
          payload = eventNameOrData;
        } else if (typeof eventNameOrData === 'function') {
          payload = eventNameOrData(getPayload());
        } else {
          payload = getPayload();
        }

        return sendToServer(payload);
      }

      function identifyUser(userData: Record<string, any>) {
        return sendToServer({ ...getPayload(), data: userData }, 'identify');
      }

      function initTracking() {
        if (initialized) return;

        // Track initial page view
        trackEvent();

        // Hook history state
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
          handlePush(null, null, args[2]);
          return originalPushState.apply(this, args);
        };

        history.replaceState = function (...args) {
          handlePush(null, null, args[2]);
          return originalReplaceState.apply(this, args);
        };

        // Watch for title changes
        const titleObserver = new MutationObserver((mutations) => {
          const title = mutations[0]?.target?.textContent;
          if (title) currentTitle = title;
        });

        const titleElement = document.querySelector('head > title');
        if (titleElement) {
          titleObserver.observe(titleElement, {
            subtree: true,
            characterData: true,
            childList: true,
          });
        }

        // Set up click tracking for data attributes
        document.addEventListener(
          'click',
          async (event) => {
            const DATA_ATTR_PREFIX = 'data-umami-event';
            const isTrackable = (tagName: string) =>
              ['BUTTON', 'A'].includes(tagName);

            const getAttribute = (el: Element) => {
              const dataAttrRegex = /data-umami-event-([\w-_]+)/;
              const attr = el.getAttribute.bind(el);
              const eventName = attr(DATA_ATTR_PREFIX);

              if (!eventName) return null;

              const eventData: Record<string, string> = {};

              el.getAttributeNames().forEach((name) => {
                const match = name.match(dataAttrRegex);
                if (match) {
                  const attrValue = attr(name);
                  if (attrValue !== null) {
                    eventData[match[1]] = attrValue;
                  }
                }
              });

              return { eventName, eventData };
            };

            const findTrackableParent = (target: Element, maxDepth: number) => {
              let el = target;
              for (let i = 0; i < maxDepth; i++) {
                if (isTrackable(el.tagName)) return el;
                const parent = el.parentElement;
                if (!parent) return null;
                el = parent;
              }
              return null;
            };

            const target = event.target as Element;
            const trackable = isTrackable(target.tagName)
              ? target
              : findTrackableParent(target, 10);

            if (!trackable) {
              const attrs = getAttribute(target);
              if (attrs) {
                const { eventName, eventData } = attrs;
                trackEvent(eventName, eventData);
              }
              return;
            }

            const { href, target: targetAttr } = trackable as HTMLAnchorElement;
            const attrs = getAttribute(trackable);

            if (!attrs) return;

            const { eventName, eventData } = attrs;

            if (trackable.tagName === 'A' && eventName) {
              const isExternalNav =
                targetAttr === '_blank' ||
                event.ctrlKey ||
                event.shiftKey ||
                event.metaKey ||
                (event.button && event.button === 1);

              if (eventName && href) {
                if (!isExternalNav) event.preventDefault();

                try {
                  await trackEvent(eventName, eventData);
                  if (!isExternalNav) location.href = href;
                } catch (e) {
                  console.error(e);
                  if (!isExternalNav) location.href = href;
                }
              }
            } else if (trackable.tagName === 'BUTTON' && eventName) {
              trackEvent(eventName, eventData);
            }
          },
          true,
        );

        initialized = true;
      }

      // Define umami globally
      window.umami = {
        track: trackEvent,
        identify: identifyUser,
      };

      // Start tracking if autotrack is enabled
      if (autoTrack && !isExcluded()) {
        if (document.readyState === 'complete') {
          initTracking();
        } else {
          document.addEventListener(
            'readystatechange',
            () => {
              if (document.readyState === 'complete') {
                initTracking();
              }
            },
            true,
          );
        }
      }

      setIsLoaded(true);
      console.log('Umami tracking initialized successfully');
    } catch (error) {
      console.error('Error initializing Umami tracking:', error);
    }
  };

  useEffect(() => {
    // Try to use script-based loading first
    const loadUmamiScript = async (): Promise<void> => {
      if (typeof window === 'undefined') return;

      if (window.umami || document.querySelector('script[data-website-id]')) {
        setIsLoaded(true);
        return;
      }

      return new Promise((resolve, reject) => {
        try {
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.setAttribute('data-website-id', websiteId ?? '');
          script.setAttribute('data-host-url', hostUrl ?? '');
          script.setAttribute('data-auto-track', autoTrack ? 'true' : 'false');
          script.setAttribute(
            'data-exclude-search',
            excludeSearch ? 'true' : 'false',
          );
          if (domains) script.setAttribute('data-domains', domains);

          script.onload = () => {
            setIsLoaded(true);
            console.log('Umami tracking script loaded successfully');
            resolve();
          };

          script.onerror = (error) => {
            console.error(
              'Failed to load Umami tracking script, falling back to inline implementation:',
              error,
            );
            initializeUmami().catch(console.error);
            reject(error);
          };

          document.head.appendChild(script);
        } catch (error) {
          console.error(
            'Error setting up Umami tracking, falling back to inline implementation:',
            error,
          );
          initializeUmami().catch(console.error);
          reject(error);
        }
      });
    };

    loadUmamiScript().catch(() => {
      // If external script fails, use our implementation
      initializeUmami().catch(console.error);
    });
  }, [websiteId, autoTrack, excludeSearch, domains, hostUrl]);

  // Track function - simplified wrapper for window.umami.track
  const track = async (
    eventName: string,
    eventData?: Record<string, any>,
  ): Promise<void> => {
    if (!isLoaded || typeof window === 'undefined' || !window.umami) {
      console.warn('Umami er ikke lastet inn.');
      return Promise.resolve();
    }

    try {
      window.umami.track(eventName, eventData);
      return Promise.resolve();
    } catch (error) {
      console.error('Feil ved logging til umami:', error);
      return Promise.reject(error);
    }
  };

  // Identify function - simplified wrapper for window.umami.identify
  const identify = async (userData: Record<string, any>): Promise<void> => {
    if (
      !isLoaded ||
      typeof window === 'undefined' ||
      !window.umami ||
      !window.umami.identify
    ) {
      console.warn(
        'Umami er ikke lastet inn eller identify-funksjon er ikke tilgjengelig.',
      );
      return Promise.resolve();
    }

    try {
      window.umami.identify(userData);
      return Promise.resolve();
    } catch (error) {
      console.error('Feil ved identifisering i umami:', error);
      return Promise.reject(error);
    }
  };

  // Track and navigate function
  const trackAndNavigate = (
    eventName: string,
    url: string,
    eventData?: Record<string, any>,
  ) => {
    track(eventName, eventData).catch(console.error);

    // Use timeout to ensure tracking has time to fire
    setTimeout(() => {
      if (url.startsWith('http')) {
        window.location.href = url;
      } else {
        router.push(url);
      }
    }, 150);
  };

  const contextValue = useMemo(
    () => ({
      isLoaded,
      track,
      trackAndNavigate,
      identify,
    }),
    [isLoaded, pathname],
  );

  return (
    <UmamiContext.Provider value={contextValue}>
      {children}
    </UmamiContext.Provider>
  );
};

// Custom hook to use the Umami context
export const useUmami = (): UmamiContextType => {
  const context = useContext(UmamiContext);
  if (context === undefined) {
    throw new Error('useUmami must be used within a UmamiProvider');
  }
  return context;
};
