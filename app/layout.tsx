import "./globals.css";
import Analytics from "@/components/Analytics";
import PostHogProvider from "@/components/PostHogProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-slate-900">
        {children}
        <Analytics />
        <PostHogProvider />
      </body>
    </html>
  );
}
