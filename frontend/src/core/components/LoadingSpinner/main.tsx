/**
 * @component LoadingSpinner
 * @summary Loading spinner indicator for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 */

import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  return (
    <div className={getLoadingSpinnerClassName({ size, className })}>
      <div className="animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  );
};
