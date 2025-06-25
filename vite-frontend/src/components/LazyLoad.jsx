import React, { useState, Suspense } from 'react';
const LargeImage = React.lazy(() => import('./LargeImage'));

export const LazyLoad = () => {
  const [showImage, setShowImage] = useState(false);

  return (
    <div>
        <button onClick={() => setShowImage(true)}>Mostrar Imagen Grande</button>

        <Suspense fallback={<div>Cargando imagen...</div>}>
            {showImage && <LargeImage />}
        </Suspense>
    </div>
  );
}