import React from 'react';
import Layout from './Layout';
import { PageName, Lang } from './routes';
import { setLinkLang } from './dc';
import Global from './pages/Global';
import Etalage from './pages/Etalage';
import Prijslijst from './pages/Prijslijst';
import OverOns from './pages/OverOns';
import Contact from './pages/Contact';
import Juridisch from './pages/Juridisch';
import Inloggen from './pages/Inloggen';

export const SIGNAL = '#FF5A1F';

const COMPONENTS: Record<PageName, React.ComponentType<{ lang: Lang; signal: string }>> = {
  Global, Etalage, Prijslijst, OverOns, Contact, Juridisch, Inloggen,
};

export default function App({ page, lang }: { page: PageName; lang: Lang }) {
  setLinkLang(lang);
  const Page = COMPONENTS[page];
  return (
    <Layout page={page} lang={lang} signal={SIGNAL}>
      <Page lang={lang} signal={SIGNAL} />
    </Layout>
  );
}
