import Link from 'next/link';
import SvgVk from '../Icons/Vk';
import SvgTelegram from '../Icons/Telegram';
import SvgInstagram from '../Icons/Instagram';

import { getSocialHrefsForUser } from '../../lib/actions';

export default async function SocialLinks() {
  const socialHrefs = await getSocialHrefsForUser();
  return (
    <div className="mt-4">
      <span className="text-lg font-semibold">Мы в соцсетях</span>
      <div className="flex mt-2">
        {socialHrefs?.map((social: any) => (
          <Link
            key={social.id}
            target="_blank"
            rel="noopener noreferrer"
            href={social.href}
          >
            {social.name === 'vk' && <SvgVk />}
            {social.name === 'telegram' && <SvgTelegram className="ml-2" />}
            {social.name === 'instagram' && <SvgInstagram className="ml-2" />}
          </Link>
        ))}
      </div>
    </div>
  );
}
