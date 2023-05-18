import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "~/components/Layout";
import { Provider } from "jotai";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
