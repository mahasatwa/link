"use client";

export default function LogoutButton() {
  return (
    <form
      action="/api/auth/logout"
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
    >
      <button type="submit" className="btn-secondary text-sm">
        Keluar
      </button>
    </form>
  );
}
