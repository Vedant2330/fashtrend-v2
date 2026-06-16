import { CinematicHero } from '@/components/hero/CinematicHero'
import { ProductRail } from '@/components/lookbook/ProductRail'
import { HeroToCollectionBridge } from '@/components/chapters/HeroToCollectionBridge'
import { EditorialLookbook } from '@/components/lookbook/EditorialLookbook'
import { WorkshopAct } from '@/components/chapters/WorkshopAct'
import { CommunityAct } from '@/components/chapters/CommunityAct'
import { InvitationAct } from '@/components/chapters/InvitationAct'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { PRODUCTS } from '@/lib/data/products'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main>
        {/* Act I - The Opening (autoplay video hero) */}
        <CinematicHero
          videoSrc="/videos/hero-desktop.webm"
          mobileSrc="/videos/hero-mobile.webm"
        />

        {/* Visual bridge */}
        <HeroToCollectionBridge />

        {/* Act II - The Wardrobe (product rail with dock magnification) */}
        <ProductRail products={PRODUCTS} />

        {/* Act III - The Editorial Lookbook */}
        <EditorialLookbook />

        {/* Act IV - The Workshop (customization) */}
        <WorkshopAct />

        {/* Act V - The World (community) */}
        <CommunityAct />

        {/* Act VI - The Invitation (CTA) */}
        <InvitationAct />
      </main>
      <SiteFooter />
    </>
  )
}