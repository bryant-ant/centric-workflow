export const metadata = {
  title: "Centric Brands — Contract Performance Monitor",
  description: "AI-powered workflow for brand performance obligation monitoring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#faf8f4" }}>
        {children}
      </body>
    </html>
  );
}
