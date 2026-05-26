'use client'

import { useState } from 'react'
import { ClipboardList, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const WEB3FORMS_ACCESS_KEY = 'e97e40cc-af7f-490a-b2fd-665785b22145'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function WaitlistDialog() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setStatus('idle')
      setErrorMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'Új várólista jelentkezés - Óbunda')
    formData.append('from_name', 'Óbunda weboldal')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(data.message ?? 'Ismeretlen hiba')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Nem sikerült elküldeni az űrlapot. Próbáld újra később.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="neutral">
          <ClipboardList className="w-4 h-4 mr-2" />
          Várólistára iratkozás
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {status === 'success' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Sikeres jelentkezés
              </DialogTitle>
              <DialogDescription>
                Köszönöm a jelentkezést! Amint felszabadul egy megfelelő időpont, jelentkezem a
                megadott elérhetőségen.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)}>Bezár</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Várólistára iratkozás</DialogTitle>
              <DialogDescription>
                Nincs megfelelő szabad időpont? Iratkozz fel a várólistára, és értesítelek, amint
                felszabadul egy időpont, amely megfelel az igényeidnek.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-name">Kutya neve *</Label>
              <Input id="waitlist-name" name="dog_name" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-phone">Telefonszám *</Label>
              <Input
                id="waitlist-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+36 30 123 4567"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-email">Email (opcionális)</Label>
              <Input id="waitlist-email" name="email" type="email" autoComplete="email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-service">Milyen szolgáltatásra? *</Label>
              <Input
                id="waitlist-service"
                name="service"
                required
                placeholder="pl. közepes testű kutya teljes körű ápolás"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-preference">Mikor lenne jó? *</Label>
              <Textarea
                id="waitlist-preference"
                name="preference"
                required
                placeholder="pl. délelőtt, vagy 16 óra után"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="waitlist-notes">Egyéb megjegyzés (opcionális)</Label>
              <Textarea
                id="waitlist-notes"
                name="notes"
                placeholder="pl. kutya fajtája, kora, különleges igények"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">
                {errorMessage ?? 'Hiba történt. Próbáld újra később.'}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="neutral"
                onClick={() => handleOpenChange(false)}
                disabled={status === 'submitting'}
              >
                Mégsem
              </Button>
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Küldés...
                  </>
                ) : (
                  'Jelentkezés'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
