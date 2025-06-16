// hooks/useAuth.js
export function useAuth() {
  return {
    user: {
      name: "Madhav",
      role: "admin", // change to "user" for testing non-admin view
    },
  };
}
