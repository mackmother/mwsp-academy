"use client";

import { useRouter } from "next/navigation";

export default function LoginDirect() {
  const router = useRouter();

  const handleAuth0Login = () => {
    router.push("/api/auth/login");
  };

  return (
    <>
      <style jsx global>{`
        body {
          background-color: white !important;
          color: #111827 !important;
          font-family: system-ui, sans-serif !important;
          margin: 0;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Branding Section - ALWAYS visible */}
        <div className="bg-gradient-to-b from-blue-grad-start to-blue-grad-end relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10">
            <h1 className="text-3xl font-bold mb-4">MSP Growth Hub</h1>
            <p className="text-lg text-center max-w-md">
              Your portal to world-class playbooks, systems, and strategies for scaling your MSP business.
            </p>
          </div>
        </div>

        {/* Login Section */}
        <div className="flex items-center justify-center px-6 py-12 relative">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
              <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>

            {/* SSO Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAuth0Login}
                className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                    fill="#4285F4"
                  />
                </svg>
                Sign in with Google
              </button>

              <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="#24292e"
                  />
                </svg>
                Sign in with GitHub
              </button>

              <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="#000000"
                  />
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or use your email</span>
              </div>
            </div>

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

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600" />
                <label htmlFor="remember" className="ml-2 text-gray-500">
                  By signing in, you agree to our{" "}
                  <a href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                  .
                </label>
              </div>

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

      {/* GDPR Cookie Banner */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow z-50 text-gray-700 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            We use cookies to personalize content, improve your experience, and analyze traffic. By
            continuing, you consent to our cookies.{" "}
            <a href="/privacy-policy" className="text-blue-600 underline hover:text-blue-800">
              Learn more
            </a>
            .
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">Decline</button>
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
