import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RequireAuth({ children }) {
  const { token, info } = useSelector((state) => state.account);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);
  return children;
}

export default RequireAuth;
