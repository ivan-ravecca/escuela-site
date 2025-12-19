import React, { lazy, Suspense } from 'react';
import { useChatWidget } from '../../contexts/ChatWidgetContext';

// Lazy load del ChatWidget para mejor performance
const ChatWidgetLazy = lazy(() => import('./ChatWidget'));

/**
 * Wrapper del ChatWidget que implementa lazy loading
 * Solo carga el componente cuando el usuario interactúa por primera vez
 */
const ChatWidgetContainer: React.FC = () => {
  const { isOpen } = useChatWidget();
  const [shouldLoad, setShouldLoad] = React.useState(false);

  // Cargar el widget cuando se abre por primera vez
  React.useEffect(() => {
    if (isOpen && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isOpen, shouldLoad]);

  // No renderizar nada hasta que se necesite
  if (!shouldLoad) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <ChatWidgetLazy />
    </Suspense>
  );
};

export default ChatWidgetContainer;
