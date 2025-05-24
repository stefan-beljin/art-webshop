import Link from "next/link";
import LinkModel from "@/app/models/shared/linkModel";

interface LinkAtomProps {
  link: LinkModel;
  className: string;
}

export default function LinkAtom({ link, className }: LinkAtomProps) {
  return (
    <Link href={link.url} target={link.target} className={className}>
      {link.title}
    </Link>
  );
}
