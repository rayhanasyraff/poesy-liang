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
    width="6px"
    height="10px"
    fill="none"
    aria-labelledby={titleId}
    aria-describedby={descId}
    {...props}
  >
    {desc ? <desc id={descId}>{desc}</desc> : null}
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#fff"
      d="m1.416 5.308 4.6 4.6-.708.708L0 5.308 5.308 0l.708.708-4.6 4.6Z"
    />
  </svg>
)
export { SvgComponent as RightArrowIcon }
