import { SignOutButton } from "@/components/auth/SignOutButton";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-semibold">Getting Started</div>
            <SignOutButton />
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}