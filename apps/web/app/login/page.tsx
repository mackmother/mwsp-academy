"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function LoginDirect() {
  const router = useRouter();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  // Handle responsive layout for client-side rendering
  useEffect(() => {
    // Set initial value
    setIsLargeScreen(window.innerWidth >= 1024);
    
    // Add resize listener
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAuth0Login = () => {
    router.push("/api/auth/login");
  };

  return (
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isLargeScreen ? '1fr 1fr' : '1fr',
        height: '100vh'
      }}>
        {/* Branding Section */}
        <div style={{
          background: 'linear-gradient(to bottom, #1e3a8a, #1d4ed8)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '2.5rem'
          }}>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>MSP Growth Hub</h1>
            <p style={{
              fontSize: '1.125rem',
              textAlign: 'center',
              maxWidth: '28rem'
            }}>
              Your portal to world-class playbooks, systems, and strategies for scaling your MSP business.
            </p>
          </div>
        </div>

        {/* Login Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '28rem'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0041C2',
                marginBottom: '0.5rem'
              }}>Welcome Back</h2>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Sign in to your account</p>
            </div>

            {/* SSO Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleAuth0Login}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d1d5db',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                <svg style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  marginRight: '0.5rem'
                }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                    fill="#4285F4"
                  />
                </svg>
                Sign in with Google
              </button>

              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}>
                <svg style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  marginRight: '0.5rem'
                }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="#1B1F23"
                  />
                </svg>
                Sign in with GitHub
              </button>
              
              <div style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#6b7280',
                marginTop: '2rem'
              }}>
                By signing in, you agree to our{" "}
                <a href="/terms" style={{ color: '#0041C2', textDecoration: 'none' }}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" style={{ color: '#0041C2', textDecoration: 'none' }}>
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
