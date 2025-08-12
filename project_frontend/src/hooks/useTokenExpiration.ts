import { useEffect } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useAuthStore } from "../stores/auth_store";

export function useTokenExpiration() {
  const { token, logout, checkTokenExpiration, restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (!decoded.exp) return;

      const now = Date.now();
      const msUntilExpiration = decoded.exp * 1000 - now - 5000;

      if (msUntilExpiration <= 0) {
        logout();
        return;
      }

      const timeout = setTimeout(() => {
        checkTokenExpiration();
      }, msUntilExpiration);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error decodificando token:", error);
      logout();
    }
  }, [token, logout, checkTokenExpiration]);
}
