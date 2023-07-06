import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { type AppType } from "next/app";
import Layout from "~/components/Layout";
import { clientEnv } from "~/env/schema.mjs";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      publishableKey={clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
        },
        variables: {
          colorPrimary: "#15803d",
        },
      }}
      {...pageProps}
    >
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
