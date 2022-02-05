import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Global
        styles={css`
          a {
          }
        `}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
