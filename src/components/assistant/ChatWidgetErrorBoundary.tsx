import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para el Chat Widget
 * Evita que errores en el chat rompan toda la aplicación
 */
class ChatWidgetErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ChatWidget Error:', error);
    console.error('Error Info:', errorInfo);
    
    // Here you could send the error to a logging service
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
    
    // Clear chat localStorage if there is an error
    try {
      localStorage.removeItem('assistant_conversation');
    } catch (err) {
      console.error('Error clearing storage:', err);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback: hidden button or minimal message
      return (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '12px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxWidth: '300px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#991b1b', margin: '0 0 8px 0' }}>
            El asistente no está disponible temporalmente.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChatWidgetErrorBoundary;
