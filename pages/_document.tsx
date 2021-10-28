import Document, { Head, Main, NextScript, Html } from "next/document";

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        </Head>
        <body className="bg-gradient-to-r from-green-500 to-blue-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
