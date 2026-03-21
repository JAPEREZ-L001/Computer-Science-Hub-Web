import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-24">
      <Card className="w-full max-w-md p-8 space-y-4 text-center">
        <h1 className="text-xl font-semibold">No pudimos confirmar tu sesión</h1>
        <p className="text-sm text-muted-foreground">
          El enlace puede haber expirado o ya fue usado. Vuelve a iniciar sesión o solicita un nuevo correo de
          confirmación.
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <Button asChild>
            <Link href="/login">Ir a iniciar sesión</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </Card>
    </main>
  )
}
