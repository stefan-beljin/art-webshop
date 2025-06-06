export default function Wrapper({
  children,
  extraClasses = "",
}: Readonly<{
  children: React.ReactNode;
  extraClasses?: string;
}>) {
  return <div className={`py-16 p-8 sm:px-15 ${extraClasses}`}>{children}</div>;
}
