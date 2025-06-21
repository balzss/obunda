import { PawPrint } from 'lucide-react'

export default function SzolgaltatasaimPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Szolgáltatásaim</h2>
      <ul className="space-y-2 text-black mb-4 mt-8">
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Fürdetés-szárítás, fésülés, csomóbontás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Nyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Trimmelés</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Karomvágás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Fültisztítás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Bűzmirigy nyomás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Egészségügyi nyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Mancsnyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Babaszoktatás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} />
          <div>Ultrahangos fogtisztítás</div>
        </li>
      </ul>
    </section>
  )
}
