import { CinematicHero } from '@/components/hero/CinematicHero'
import { EditorialLookbook } from '@/components/lookbook/EditorialLookbook'
import { WorkshopAct } from '@/components/chapters/WorkshopAct'
import { CommunityAct } from '@/components/chapters/CommunityAct'
import { InvitationAct } from '@/components/chapters/InvitationAct'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main>
        <CinematicHero
          videoSrc="/videos/hero-desktop.webm"
          mobileSrc="/videos/hero-mobile.webm"
        />
        <EditorialLookbook />
        <WorkshopAct />
        <CommunityAct />
        <InvitationAct />
      </main>
      <SiteFooter />
    </>
  )
}