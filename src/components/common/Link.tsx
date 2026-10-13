import React from 'react';
import NextLink from 'next/link';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string;
  to?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export const Link: React.FC<LinkProps> = ({ href, to, children, ...props }) => {
  const destination = href || to || '#';
  const isExternal = destination.startsWith('http') || destination.startsWith('//');

  if (isExternal) {
    return (
      <a href={destination} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={destination} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
