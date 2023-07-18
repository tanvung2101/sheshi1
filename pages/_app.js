import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from 'next/dynamic'
import Init from "@/components/Init";
const HeaderUser = dynamic(() => import('./../components/HeaderUser'), { ssr: false })
const Footer = dynamic(() => import('./../components/Footer'), { ssr: false })
import "@/styles/globals.css";
import '@/styles/promotions.css'
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { appWithTranslation } from 'next-i18next';
import { useRouter } from "next/router";

let persistor = persistStore(store);

function App({ Component, pageProps }) {
  const router = useRouter()
  console.log('helllo', router)
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Same as */}
          <HeaderUser pathname={router.pathname}>
          </HeaderUser>
          <Init>
            <Component {...pageProps} />
          </Init>
          <Footer></Footer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default appWithTranslation(App)