export interface Product {
  id: string
  slug: string
  name: string
  category: 'oversized' | 'custom' | 'kids' | 'festival' | 'event' | 'corporate'
  price: number
  originalPrice?: number
  description: string
  story: string
  details: string[]
  fabric: string
  fit: string
  care: string[]
  images: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
  tags: string[]
  featured?: boolean
  isNew?: boolean
  isLimited?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'world-cup-streetwear',
    slug: 'world-cup-streetwear',
    name: 'World Cup Streetwear',
    category: 'festival',
    price: 799,
    originalPrice: 999,
    description: 'A celebration of football culture, rendered in premium heavyweight cotton.',
    story: 'Born from the energy of stadium terraces and late-night street conversations, this piece is a love letter to the beautiful game.',
    details: ['Heavyweight 240 GSM cotton', 'Drop-shoulder cut', 'Hand-screened graphics', 'Reinforced shoulder seams'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized — size down for regular fit',
    care: ['Machine wash cold', 'Wash inside out', 'Do not bleach', 'Tumble dry low'],
    images: ['/images/products/world-cup.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'True Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'streetwear', 'festival'],
    isNew: true,
  },
  {
    id: 'cool-bold-oversized',
    slug: 'cool-bold-oversized',
    name: 'Cool & Bold Oversized',
    category: 'oversized',
    price: 699,
    description: 'The signature relaxed silhouette, cut from heavyweight cotton with intention.',
    story: 'A modern essential. The kind of tee you reach for without thinking — and never regret.',
    details: ['Oversized boxy fit', '240 GSM premium cotton', 'Twin-needle stitched hems', 'Pre-washed for softness'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'True oversized',
    care: ['Machine wash cold', 'Wash with similar colors', 'Tumble dry low'],
    images: ['/images/products/cool-bold.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Charcoal', hex: '#1C1C1C' },
      { name: 'Sand', hex: '#D4C9BE' },
      { name: 'Olive', hex: '#4A5538' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['oversized', 'essential', 'everyday'],
    featured: true,
  },
  {
    id: '2026-confidence',
    slug: '2026-confidence',
    name: '2026 Confidence',
    category: 'festival',
    price: 749,
    originalPrice: 899,
    description: 'New year. New wardrobe. Same uncompromising quality.',
    story: 'Designed to mark the moment. A tee that says you mean business — about style, about life.',
    details: ['Limited New Year drop', 'Heavyweight cotton', 'Metallic foil detail', 'Numbered edition'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Regular — true to size',
    care: ['Hand wash recommended', 'Do not iron print'],
    images: ['/images/products/2026-confidence.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'True Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['newyear', 'limited', 'festival'],
    isLimited: true,
  },
  {
    id: 'cultural-vibe',
    slug: 'cultural-vibe',
    name: 'Cultural Vibe',
    category: 'festival',
    price: 799,
    description: 'Heritage meets street culture. A piece with a story.',
    story: 'Inspired by the colors, patterns, and traditions that make our culture timeless.',
    details: ['Heritage-inspired graphics', 'Heavyweight 240 GSM', 'Hand-finished details', 'Limited run'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized — relaxed silhouette',
    care: ['Machine wash cold', 'Wash inside out'],
    images: ['/images/products/cultural-vibe.webp'],
    colors: [
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C9BE' },
      { name: 'Charcoal', hex: '#1C1C1C' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['heritage', 'festival', 'culture'],
  },
  {
    id: 'custom-attitude',
    slug: 'custom-attitude',
    name: 'Custom Attitude',
    category: 'custom',
    price: 699,
    description: 'Your design. Our craft. Pure attitude.',
    story: 'The blank canvas for your boldest ideas. Print anything, wear everything.',
    details: ['Fully customizable', 'Premium print quality', 'Choose your placement', 'Bulk pricing available'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Regular or oversized — your choice',
    care: ['Machine wash cold', 'Wash inside out'],
    images: ['/images/products/custom-attitude.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Charcoal', hex: '#1C1C1C' },
      { name: 'True Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['custom', 'personalize', 'bespoke'],
    featured: true,
  },
  {
    id: 'new-vibe',
    slug: 'new-vibe',
    name: 'New Vibe',
    category: 'oversized',
    price: 699,
    description: 'A fresh take on a classic. Comfortable, considered, current.',
    story: 'Sometimes the best things are the simplest. A new staple, made right.',
    details: ['Pre-shrunk cotton', 'Reinforced collar', 'Side-seamed construction', 'Tagless for comfort'],
    fabric: '100% Combed Cotton, 220 GSM',
    fit: 'True to size',
    care: ['Machine wash cold', 'Tumble dry low'],
    images: ['/images/products/new-vibe.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Sand', hex: '#D4C9BE' },
      { name: 'Olive', hex: '#4A5538' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['essential', 'new', 'staple'],
    isNew: true,
  },
  {
    id: 'princess-iron',
    slug: 'princess-iron',
    name: 'Princess Iron',
    category: 'kids',
    price: 499,
    originalPrice: 599,
    description: 'For the little ones with big personalities.',
    story: 'Soft, safe, and stylish. Designed for tiny humans with mighty spirits.',
    details: ['Soft 180 GSM cotton', 'Kid-safe inks', 'Reinforced seams', 'Tagless interior'],
    fabric: '100% Cotton, 180 GSM',
    fit: 'Regular — true to size',
    care: ['Machine wash warm', 'Tumble dry low'],
    images: ['/images/products/princess-iron.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C9BE' },
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    tags: ['kids', 'soft', 'playful'],
  },
  {
    id: '50off-newyear',
    slug: '50off-newyear',
    name: 'New Year 50% Off',
    category: 'festival',
    price: 399,
    originalPrice: 799,
    description: 'Start the year right. Premium quality, half the price.',
    story: 'A new year deserves a new wardrobe. And the wardrobe deserves quality.',
    details: ['Limited time pricing', 'Premium construction', 'Same uncompromising quality'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized — true to size',
    care: ['Machine wash cold'],
    images: ['/images/products/50off-newyear.webp'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'True Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['sale', 'newyear', 'festival'],
    isLimited: true,
  },
]

export const COLLECTIONS = [
  {
    id: 'oversized',
    name: 'Oversized',
    description: 'Relaxed silhouettes, considered cuts.',
    image: '/images/products/cool-bold.webp',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Your design, our craft.',
    image: '/images/products/custom-attitude.webp',
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'For the next generation.',
    image: '/images/products/princess-iron.webp',
  },
  {
    id: 'festival',
    name: 'Festival',
    description: 'Limited drops, lasting memories.',
    image: '/images/products/world-cup.webp',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) return []
  return PRODUCTS
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}