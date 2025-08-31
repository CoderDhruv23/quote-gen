import "./globals.css";

export const metadata = {
  title: "AI Quote Generator",
  description: "Motivational Quote of the Day powered by Groq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
