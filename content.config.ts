import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const socialSchema = z.object({
  image: z.string().optional(),
  og: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }).optional(),
  twitter: z.object({
    card: z.enum(['summary', 'summary_large_image', 'app', 'player']).optional(),
    title: z.string().optional(),
    image: z.string().optional(),
  }).optional(),
})

const infoSchema = socialSchema.extend({
  status: z.enum(['draft', 'review', 'live']).default('live'),
})

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**',
      schema: socialSchema,
    }),
    siteInfo: defineCollection({
      type: 'page',
      source: 'info/**',
      schema: infoSchema,
    }),
  },
})
