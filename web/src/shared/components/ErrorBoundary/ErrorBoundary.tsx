// web/src/shared/components/ErrorBoundary/ErrorBoundary.tsx
// FIX #15 : Error Boundary global — évite qu'un crash React tue tout le NUI
import { Component, type ReactNode, type ErrorInfo } from 'react';



interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // En production FiveM, on peut envoyer l'erreur au Lua via fetchNui
    console.error('[kt_hud] ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      // Fallback minimal, invisible en jeu
      return (
        <div
          style={{
            position: 'fixed',
            bottom: 8,
            left: 8,
            background: 'rgba(200,0,0,0.85)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 11,
            fontFamily: 'monospace',
            zIndex: 9999,
            pointerEvents: 'auto',
            maxWidth: 320,
          }}
        >
          <strong>[kt_hud] UI Error</strong>
          <br />
          {this.state.error?.message}
          <br />
          <button
            onClick={this.handleReset}
            style={{
              marginTop: 4,
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              borderRadius: 4,
              padding: '2px 8px',
              cursor: 'pointer',
              fontSize: 10,
            }}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
