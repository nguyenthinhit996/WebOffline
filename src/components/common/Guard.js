"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import WarningModal from "@/components/common/WarningModal";
import { Loader } from "@/components/common/Loader";
import { OFFLINE_MSG } from "@/util/Utils";
import { ModalContext } from "@/context/ModalContext";

export function Guard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { openWarning, setOpenWarning } = React.useContext(ModalContext);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const userId = localStorage.getItem("userId") || "";
    if (loading) {
      setLoading(!token || !userId);
    }
    if (!token || !userId) router.push("/login");
  }, [router, loading]);
  if (loading) return <Loader />;
  return (
    <>
      <WarningModal
        open={openWarning}
        onClose={() => setOpenWarning(false)}
        message={OFFLINE_MSG}
      />
      {children}
    </>
  );
}
