import Link, { LinkProps } from "next/link"

export function LinkWrap({ href, style, className, children }:
  { href: string, style?: any, className?: any, children: React.ReactNode }) {
  return <a href={href}>
    {children}
  </a>;
}

