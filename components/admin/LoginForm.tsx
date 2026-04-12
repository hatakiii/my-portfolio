"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!json.success) {
        setError(json.error || "Нэвтрэхэд алдаа гарлаа");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Сервертэй холбогдож чадсангүй");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-shell">
        <div className="auth-panel">
          <p className="admin-kicker">Owner Access</p>
          <h1 className="admin-title">Portfolio admin руу нэвтрэх</h1>
          <p className="admin-subtitle">
            Төслүүдээ нэмэх, засах, устгах эрх зөвхөн танд нээлттэй байна.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Нэвтрэх нэр
              </label>
              <input
                id="username"
                className="form-input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Нууц үг
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>
            <button
              type="button"
              className="btn-primary bg-white text-black"
              onClick={() => router.push("/")}
            >
              Буцах
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
