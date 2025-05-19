"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@ui/mantine-config";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" autoClose={2000} w={400} />
      {children}
    </MantineProvider>
  );
}
