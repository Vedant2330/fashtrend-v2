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
    images: ['/images/products/cool-bold-white.jpg', '/images/products/cool-bold-charcoal.jpg', '/images/products/cool-bold-cream.jpg'],
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
    id: 'world-cup-streetwear',
    slug: 'world-cup-streetwear',
    name: 'World Cup Streetwear',
    category: 'festival',
    price: 799,
    originalPrice: 999,
    description: 'A celebration of football culture, rendered in premium heavyweight cotton.',
    story: 'Born from the energy of stadium terraces and late-night street conversations.',
    details: ['Heavyweight 240 GSM cotton', 'Drop-shoulder cut', 'Hand-screened graphics', 'Reinforced shoulder seams'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized — size down for regular fit',
    care: ['Machine wash cold', 'Wash inside out', 'Do not bleach', 'Tumble dry low'],
    images: ['/images/products/world-cup.jpg', '/images/editorial/festival-flatlay.jpg', '/images/editorial/urban-lookbook.jpg'],
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
    id: 'cultural-vibe',
    slug: 'cultural-vibe',
    name: 'Cultural Vibe',
    category: 'festival',
    price: 799,
    description: 'Heritage meets street culture. A piece with a story.',
    story: 'Inspired by the colors, patterns, and traditions that make culture timeless.',
    details: ['Heritage-inspired graphics', 'Heavyweight 240 GSM', 'Hand-finished details', 'Limited run'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized — relaxed silhouette',
    care: ['Machine wash cold', 'Wash inside out'],
    images: ['/images/collections/festival.jpg', '/images/editorial/walk-arch.jpg', '/images/products/folded-stacks.jpg'],
    colors: [
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C9BE' },
      { name: 'Charcoal', hex: '#1C1C1C' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['heritage', 'festival', 'culture'],
    isLimited: true,
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
    images: ['/images/products/custom-attitude.jpg', '/images/collections/custom.jpg', '/images/editorial/cafe-portrait.jpg'],
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
    images: ['/images/products/sage-tee.jpg', '/images/products/cool-bold-cream.jpg'],
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
    images: ['/images/products/kids-match.jpg', '/images/collections/kids.jpg', '/images/ugc/friends-laughing.jpg'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C9BE' },
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    tags: ['kids', 'soft', 'playful'],
  },
  {
    id: '2026-confidence',
    slug: '2026-confidence',
    name: '2026 Confidence',
    category: 'festival',
    price: 749,
    originalPrice: 899,
    description: 'New year. New wardrobe. Same uncompromising quality.',
    story: 'Designed to mark the moment. A tee that says you mean business.',
    details: ['Limited New Year drop', 'Heavyweight cotton', 'Metallic foil detail', 'Numbered edition'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Regular — true to size',
    care: ['Hand wash recommended', 'Do not iron print'],
    images: ['/images/products/black-moody.jpg', '/images/editorial/studio-still.jpg', '/images/editorial/walking-wide.jpg'],
    colors: [
      { name: 'Optic White', hex: '#FAFAF5' },
      { name: 'True Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['newyear', 'limited', 'festival'],
    isLimited: true,
  },
  {
    id: 'oversized-classic-cream',
    slug: 'oversized-classic-cream',
    name: 'The Cream Classic',
    category: 'oversized',
    price: 749,
    description: 'The warm cream essential. Goes with everything.',
    story: 'A wardrobe workhorse — soft, structured, and elevated.',
    details: ['Heavyweight 240 GSM', 'Pre-washed softness', 'Tagless heat-transferred label', 'Twin-needle hems'],
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized',
    care: ['Machine wash cold', 'Hang dry recommended'],
    images: ['/images/products/cool-bold-cream.jpg', '/images/products/cool-bold-white.jpg'],
    colors: [
      { name: 'Vintage Cream', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C9BE' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['oversized', 'cream', 'essential'],
    featured: true,
  },
]

export const COLLECTIONS = [
  {
    id: 'oversized',
    name: 'Oversized',
    description: 'Relaxed silhouettes, considered cuts.',
    image: '/images/collections/oversized.jpg',
    largeImage: '/images/editorial/cafe-portrait.jpg',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Your design, our craft.',
    image: '/images/collections/custom.jpg',
    largeImage: '/images/editorial/studio-still.jpg',
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'For the next generation.',
    image: '/images/collections/kids.jpg',
    largeImage: '/images/products/kids-match.jpg',
  },
  {
    id: 'festival',
    name: 'Festival',
    description: 'Limited drops, lasting memories.',
    image: '/images/collections/festival.jpg',
    largeImage: '/images/editorial/walk-arch.jpg',
  },
]

export const EDITORIAL_LOOKBOOK = [
  {
    title: 'The Cut',
    caption: 'A study in proportion',
    image: '/images/editorial/studio-still.jpg',
    size: 'large' as const,
  },
  {
    title: 'The Cloth',
    caption: 'Heavyweight, breathable',
    image: '/images/detail/fabric-cotton.jpg',
    size: 'small' as const,
  },
  {
    title: 'On the Move',
    caption: 'Made for the city',
    image: '/images/editorial/walking-wide.jpg',
    size: 'small' as const,
  },
  {
    title: 'The Craft',
    caption: 'Every stitch considered',
    image: '/images/detail/collar-stitching.jpg',
    size: 'small' as const,
  },
  {
    title: 'In the Wild',
    caption: 'Worn by the world',
    image: '/images/editorial/walk-arch.jpg',
    size: 'medium' as const,
  },
  {
    title: 'The Detail',
    caption: 'Premium fabrics',
    image: '/images/detail/tag-closeup.jpg',
    size: 'small' as const,
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