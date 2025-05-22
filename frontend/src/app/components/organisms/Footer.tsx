import acfService from "@/app/services/acfService";
import ImageAtom from "../atoms/Image";

import BackToTop from "../atoms/BackToTop";

export default async function Footer() {
  const { footerTitle, address, email, copyright, socials } =
    await acfService.fetchOptionsByGroupName("footer");

  return (
    <footer className="px-8 gap-16 sm:px-15 lg:col-start-[2]">
      <div className="flex justify-between w-full py-[32px]">
        <div>
          <h2 className="text-[22px] lg:text-[36px] mb-[20px]">
            {footerTitle}
          </h2>
          <div
            className="mb-[20px]"
            dangerouslySetInnerHTML={{ __html: address }}
          ></div>
          <a href={`mailto: ${email}`}>{email}</a>
        </div>
        <BackToTop />
      </div>
      <div className="flex justify-between py-[20px] border-t-2 border-(--color-light-gray) w-full">
        {copyright && <p>{copyright}</p>}
        {socials.length > 0 && (
          <ul>
            {socials.map((social) => {
              const { socialUrl, icon } = social;
              return (
                <li key={icon.id}>
                  <a href={socialUrl}>{<ImageAtom image={icon} />}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </footer>
  );
}
