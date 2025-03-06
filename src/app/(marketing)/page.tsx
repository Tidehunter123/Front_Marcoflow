import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { Hero } from '@/components/marketing/home/hero';

export const metadata = { title: config.site.name, description: config.site.description } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <div>
      <Hero />
    </div>
  );
}
