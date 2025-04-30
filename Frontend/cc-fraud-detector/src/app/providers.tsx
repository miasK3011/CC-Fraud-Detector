"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@ui/mantine-config";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" autoClose={2000} />
      {children}
    </MantineProvider>
  );
}
