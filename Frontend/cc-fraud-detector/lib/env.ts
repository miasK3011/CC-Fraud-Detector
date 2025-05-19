import * as z from 'zod'

const createEnv = () => {
    const EnvSchema = z.object({
        NEXT_PUBLIC_APP_URL: z.string().url(),
        NEXT_PUBLIC_API_URL: z.string().url(),
    })

    const envVars = {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    }

    const parsedEnv = EnvSchema.safeParse(envVars)

    if (!parsedEnv.success) {
        throw new Error(
            `Configuração de ambiente inválida.
As seguintes variáveis estão ausentes ou inválidas:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
                .map(([key, errors]) => `- ${key}: ${errors.join(', ')}`)
                .join('\n')}`
        )
    }

    return parsedEnv.data
}

export const env = createEnv()