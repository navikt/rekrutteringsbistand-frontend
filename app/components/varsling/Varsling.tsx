import { Alert, type AlertProps } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
} from 'react';

export type VisVarslingAction = {
  innhold: ReactNode;
  alertType?: AlertType;
  varighetMs?: number;
};

export type AlertType = AlertProps['variant'];

type VarslingState = {
  innhold: ReactNode;
  alertType: AlertType;
};

const emptyVarslingState: VarslingState = {
  innhold: null,
  alertType: 'info',
};

type Context = [
  VarslingState | undefined,
  Dispatch<SetStateAction<VarslingState>>,
];

const VarslingContext = createContext<Context>([
  undefined,
  () => {
    logger.error('VarslingContext has no provider');
  },
]);

export const VarslingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const stateAndSetState = React.useState<VarslingState>({
    innhold: null,
    alertType: 'info',
  });

  return (
    <VarslingContext.Provider value={stateAndSetState}>
      {children}
    </VarslingContext.Provider>
  );
};

export const useVisVarsling = (): ((props: VisVarslingAction) => void) => {
  const [, setState] = useContext(VarslingContext);

  return useCallback(
    ({ innhold, alertType = 'info', varighetMs = 4000 }) => {
      setState({
        innhold,
        alertType,
      });

      setTimeout(() => {
        setState((state) => {
          if (state.innhold === innhold) {
            return emptyVarslingState;
          } else {
            return state;
          }
        });
      }, varighetMs);
    },
    [setState],
  );
};

export const Varsling: FunctionComponent = () => {
  const [state] = useContext(VarslingContext);

  if (state === undefined || state.innhold === null) {
    return null;
  }

  return (
    <Alert
      fullWidth
      className='fixed top-0 flex justify-center w-full z-100'
      variant={state.alertType}
      aria-live='assertive'
    >
      {state.innhold}
    </Alert>
  );
};
