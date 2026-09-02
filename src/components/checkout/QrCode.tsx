"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrCode({ value, size = 200 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(value, {
      margin: 1,
      width: size * 2,
      color: { dark: "#152238", light: "#fffefa" },
      errorCorrectionLevel: "M",
    })
      .then((url) => alive && setSrc(url))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [value, size]);

  return (
    <div
      className="grid place-items-center rounded-xl glass p-3"
      style={{ width: size + 24, height: size + 24 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="eSIM activation QR code" width={size} height={size} className="rounded-md" />
      ) : (
        <span className="animate-pulse-dot text-ink-muted">◌</span>
      )}
    </div>
  );
}
