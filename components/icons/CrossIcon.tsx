import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
  desc?: string;
  descId?: string;
}
const SvgComponent = ({
  title,
  titleId,
  desc,
  descId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26px"
    height="26px"
    fill="none"
    aria-labelledby={titleId}
    aria-describedby={descId}
    {...props}
  >
    {desc ? <desc id={descId}>{desc}</desc> : null}
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.083}
      d="m6.5 6.5 13 13m0-13-13 13"
    />
  </svg>
)
export { SvgComponent as CrossIcon }
