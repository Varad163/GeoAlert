"use client";

import dynamic from "next/dynamic";

export const MapPicker = dynamic(() => import("./MapPickerContent"), {
  ssr: false,
});
