interface Window {
  umami?: {
    track: (event: string, data?: Record<string, any>) => void;
    identify: (userData: Record<string, any>) => void;
  };
  skyra?: {
    start: (config: { org: string; ingestUrl?: string }) => void;
    redactSearchParam: (param: string, options?: { path: string }) => void;
  };
  __SKYRA_CONFIG__?: {
    ingestUrl?: string;
  };
}
