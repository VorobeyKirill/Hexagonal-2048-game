import { useEffect, useState } from 'react';
import { usePrevProps } from './usePrevProps';

export const useScale = (currentValue: number): number => {
  const [scale, setScale] = useState(1);
  const previousValue = usePrevProps(currentValue);

  const isNewValue = previousValue === undefined;
  const isValueChanged = previousValue !== currentValue;
  const isZeroValue = currentValue === 0;

  const shouldCellScale = !isZeroValue && (isNewValue || isValueChanged);

  useEffect(() => {
    if (shouldCellScale) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [shouldCellScale]);

  return scale;
}
