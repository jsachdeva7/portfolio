import { z } from 'zod'

const serverSchema = z.object({})

const clientSchema = z.object({})

function formatZodErrors(error: z.ZodError) {
  return error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('\n')
}

export const env = {
  client: (() => {
    const clientEnv = {}
    const parsed = clientSchema.safeParse(clientEnv)
    if (!parsed.success) {
      throw new Error(`Invalid client env:\n${formatZodErrors(parsed.error)}`)
    }
    return parsed.data
  })(),

  server: (() => {
    if (typeof window !== 'undefined') return {} as z.infer<typeof serverSchema>
    const parsed = serverSchema.safeParse(process.env)
    if (!parsed.success) {
      throw new Error(`Invalid server env:\n${formatZodErrors(parsed.error)}`)
    }
    return parsed.data
  })()
}
