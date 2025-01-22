'use client';

import { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  variant?: 'outline' | 'solid';
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({ 
  icon: IconComponent, 
  className, 
  variant = 'outline',
  ...props 
}, ref) => {
  return (
    <IconComponent
      ref={ref}
      className={className}
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      {...(variant === 'outline' 
        ? {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { color: 'inherit' }
          } 
        : {
            fill: "currentColor",
            stroke: "none",
            style: { color: 'inherit' }
          }
      )}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;