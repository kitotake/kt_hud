import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[kt_hud]', error, info.componentStack);
  }
  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        position: 'fixed', bottom: 8, left: 8,
        background: 'rgba(180,0,0,0.85)', color: '#fff',
        padding: '6px 12px', borderRadius: 6,
        fontSize: 11, fontFamily: 'monospace',
        zIndex: 9999, pointerEvents: 'auto',
      }}>
        <strong>[kt_hud] crash</strong> — {this.state.error?.message}
        <br />
        <button
          onClick={() => this.setState({ hasError: false, error: null })}
          style={{ marginTop: 4, background: 'rgba(255,255,255,0.2)', border: 'none',
            color: '#fff', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
        >retry</button>
      </div>
    );
  }
}
