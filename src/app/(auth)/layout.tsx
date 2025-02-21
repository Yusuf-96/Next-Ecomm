export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex items-center justify-center gap-4 py-8 md:py-10 min-h-screen relative ">
        <div className="mx-auto max-w-7xl pt-8 px-6 justify-center">
          {children}
        </div>
      </section>
    );
  }
  