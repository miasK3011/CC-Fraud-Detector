import { DefaultMantineColor, MantineColorsTuple, MantineThemeOverride } from '@mantine/core';

declare module "@ui/mantine-config" {
    export const theme: MantineThemeOverride

}


type ExtendedCustomColors = DefaultMantineColor;

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, MantineColorsTuple>;
    }
}