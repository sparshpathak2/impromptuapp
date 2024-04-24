// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { HeaderMenu } from '@/components/HeaderMenu/HeaderMenu';
import Provider from '@/components/Providers';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider session={undefined}>
          <MantineProvider>
            <HeaderMenu />
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}