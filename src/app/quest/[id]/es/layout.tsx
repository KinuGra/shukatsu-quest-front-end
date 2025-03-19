import { MyProvider } from "@/provider/esProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MyProvider>{children}</MyProvider>
    </>
  );
}
