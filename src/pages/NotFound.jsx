import { Head } from '@/components/ui/Head'
import { Kicker } from '@/components/ui/Kicker'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Head
        title="Page not found"
        description="That page is not on the menu. Head back to the Nizachem home page or have a look at the menu."
        path="/404"
      />

      <section className="grid min-h-[80svh] place-items-center px-5 py-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[46ch] text-center">
          <Kicker en="404" rule={false} className="justify-center" />
          <h1 className="mt-6 text-display-2 display-wonk text-ink">
            That one isn&rsquo;t on the <em className="italic">menu</em>.
          </h1>
          <p className="mt-6 text-lead text-ink-soft">
            The page you were looking for has moved or never existed. The kitchen is still very much open.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="primary">
              Back home
            </Button>
            <Button to="/menu" variant="outline">
              View the menu
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
