"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CookieBanner from "../../components/ui/CookieBanner";

export default function Login() {
  const router = useRouter();

  const handleAuth0Login = () => {
    router.push("/api/auth/login");
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Branding panel */}
        <div className="hidden lg:block bg-gradient-to-b from-blueGrad-start to-blueGrad-end relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10">
            <h1 className="text-4xl font-extrabold mb-4">MSP Growth Hub</h1>
            <p className="text-lg text-center max-w-md text-gray-300">
              Your portal to world-class playbooks, systems, and strategies for scaling your MSP
              business.
            </p>
          </div>
        </div>

        {/* Login card */}
        <div className="flex items-center justify-center px-6 py-12 relative">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-800">Welcome Back</h2>
              <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>

            {/* SSO Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAuth0Login}
                className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100"
              >
                <Image src="https://cdn.jsdelivr.net/npm/simple-icons/icons/google.svg" width={20} height={20} alt="Google" className="mr-2" />
                Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
                <Image src="https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg" width={20} height={20} alt="GitHub" className="mr-2" />
                Sign in with GitHub
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
                <Image src="https://cdn.jsdelivr.net/npm/simple-icons/icons/apple.svg" width={20} height={20} alt="Apple" className="mr-2" />
                Sign in with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or use your email</span>
              </div>
            </div>

            {/* Email fallback form (not wired yet) */}
            <form className="space-y-4 text-sm" action="/api/auth/login" method="post">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:ring-primary focus:border-primary"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:ring-primary focus:border-primary"
                required
              />
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded">
                Sign In
              </button>
            </form>

            <div className="text-center text-sm text-gray-500">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
      <CookieBanner />
    </>
  );
}
