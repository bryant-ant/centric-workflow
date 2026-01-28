Page · JSX
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const colors = {
  bg: "#faf8f4",
  cardBg: "#ffffff",
  cardBorder: "#e8e4d8",
  textPrimary: "#1a1a18",
  textSecondary: "#6b6b5e",
  textMuted: "#9a9a8e",
  accentWarm: "#c96b3a",
  accentPurple: "#7b5ea7",
};

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: colors.bg,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: colors.bg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 10,
          padding: "6px 16px",
          marginBottom: 20,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            Centric Brands × Claude AI
          </span>
        </div>

        <h1 style={{
          fontSize: 22,
          fontWeight: 800,
          color: colors.textPrimary,
          margin: "0 0 6px",
          letterSpacing: "-0.3px",
        }}>
          Contract Performance Monitor
        </h1>
        <p style={{
          fontSize: 13,
          color: colors.textSecondary,
          margin: "0 0 28px",
        }}>
          Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 15,
              border: `1.5px solid ${error ? "#c45050" : colors.cardBorder}`,
              borderRadius: 10,
              outline: "none",
              background: colors.bg,
              color: colors.textPrimary,
              fontFamily: "inherit",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = colors.accentPurple;
            }}
            onBlur={(e) => {
              if (!error) e.target.style.borderColor = colors.cardBorder;
            }}
          />

          {error && (
            <p style={{
              color: "#c45050",
              fontSize: 13,
              margin: "10px 0 0",
              fontWeight: 500,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              marginTop: 18,
              width: "100%",
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              background: loading || !password ? colors.textMuted : colors.accentWarm,
              border: "none",
              borderRadius: 10,
              cursor: loading || !password ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s ease",
              boxShadow: loading || !password ? "none" : `0 3px 12px ${colors.accentWarm}40`,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}