'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const otherLocale = currentLocale === 'en' ? 'sv' : 'en';
  const flagSrc = currentLocale === 'sv' ? '/flags/uk.png' : '/flags/se.png';

  return (
    <Link href={pathname} locale={otherLocale}>
      <Image src={flagSrc} alt={`Switch to ${otherLocale === 'en' ? 'English' : 'Swedish'}`} width={35} height={35} />
    </Link>
  );
}
