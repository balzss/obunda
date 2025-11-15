import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const kistestuekPriceList = [
  {
    name: 'Yorki',
    price: 9000,
  },
  {
    name: 'Yorki 5 kg felett',
    price: 9500,
  },
  {
    name: 'Havanese, bolognese, máltai',
    price: 10500,
  },
  {
    name: 'Bichon frisé',
    price: 11500,
  },
  {
    name: 'Westie nyírva',
    price: 11000,
  },
  {
    name: 'Pomerániai törpespicc',
    price: 10500,
  },
  {
    name: 'Cavalier K.C.spániel',
    price: 10000,
  },
  {
    name: 'Cavalier nyírva',
    price: 11000,
  },
  {
    name: 'Szálkás tacskó nyírva',
    price: 10000,
  },
  {
    name: 'Szálkás tacskó trimmelve',
    price: 12000,
  },
  {
    name: 'Corgi',
    price: 9500,
  },
]

const kozepesTestuekPriceList = [
  {
    name: 'Spániel nyírva',
    price: 12000,
  },
  {
    name: 'Spániel trimmelve',
    price: 14500,
  },
  {
    name: 'Ausztrál juhászkutya',
    price: 14000,
  },
  {
    name: 'Sheltie',
    price: 12500,
  },
  {
    name: 'Border collie',
    price: 13500,
  },
  {
    name: 'Mudi',
    price: 10500,
  },
  {
    name: 'Pumi',
    price: 14000,
  },
  {
    name: 'Lagotto',
    price: 15000,
  },
  {
    name: 'Puli nyírva',
    price: 14000,
  },
]

const nagytestuekPriceList = [
  {
    name: 'Husky',
    price: 16500,
  },
  {
    name: 'Malamut',
    price: 19000,
  },
  {
    name: 'Szamojed',
    price: 19000,
  },
  {
    name: 'Berni pásztor',
    price: 20000,
  },
  {
    name: 'Golden retriever',
    price: 15500,
  },
  {
    name: 'Német juhász',
    price: 16500,
  },
  {
    name: 'Skót juhász',
    price: 18000,
  },
]

const rovidszoruekPriceList = [
  {
    name: 'Tacskó',
    price: 6500,
  },
  {
    name: 'Francia bulldog',
    price: 7500,
  },
  {
    name: 'Mopsz',
    price: 8500,
  },
  {
    name: 'Beagle',
    price: 9500,
  },
  {
    name: 'Vizsla',
    price: 9500,
  },
  {
    name: 'Labrador',
    price: 10500,
  },
]

const uszkarokPriceList = [
  {
    name: 'Toy (24-28 cm)',
    price: 10500,
  },
  {
    name: 'Törpe (28-35 cm)',
    price: 11500,
  },
  {
    name: 'Közép (35-45 cm)',
    price: 13500,
  },
  {
    name: 'Óriás (45 cm felett)',
    price: 19000,
  },
]

const schnauzerekPriceList = [
  {
    name: 'Törpe nyírva',
    price: 11000,
  },
  {
    name: 'Törpe trimmelve',
    price: 13500,
  },
  {
    name: 'Közép nyírva',
    price: 13000,
  },
  {
    name: 'Közép trimmelve',
    price: 15500,
  },
  {
    name: 'Óriás nyírva',
    price: 17500,
  },
]

const tovabbiSzolgaltatasokPriceList = [
  {
    name: 'Egészségügyi (intim területek nyírása, mancsnyírás, karomvágás, fültisztítás)',
    price: 4000,
  },
  {
    name: 'Karomvágás karomreszeléssel',
    price: 2000,
  },
  {
    name: 'Bűzmirigy tisztítás',
    price: 1500,
  },
  {
    name: 'Bolhairtás',
    price: 1500,
  },
  {
    name: 'Ultrahangos fogkőszedés',
    price: 16000,
  },
]

export function PriceTable() {
  return (
    <div>
      <h3>Kistestűek</h3>
      <Table>
        <TableBody>
          {kistestuekPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">Közepes testűek</h3>
      <Table>
        <TableBody>
          {kozepesTestuekPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">Nagytestűek</h3>
      <Table>
        <TableBody>
          {nagytestuekPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">Rövidszőrűek</h3>
      <Table>
        <TableBody>
          {rovidszoruekPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">Uszkárok</h3>
      <Table>
        <TableBody>
          {uszkarokPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">Schnauzerek</h3>
      <Table>
        <TableBody>
          {schnauzerekPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8">További szolgáltatások</h3>
      <Table>
        <TableBody>
          {tovabbiSzolgaltatasokPriceList.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="p-3">{item.name}</TableCell>
              <TableCell className="text-right text-nowrap p-3">{item.price} Ft.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ul className="list-disc pl-5 space-y-2 text-gray-900 mb-4 mt-8">
        <li>
          Áraim forintban és rendszeresen (4-6 hetente) kozmetikázott kutyusokra értendőek.
          Elhanyagolt szőrzetért és a kutyus viselkedésétől függően felárat számíthatok fel.
        </li>
        <li>Készpénzzel vagy átutalással tudtok nálam fizetni.</li>
        <li>24 órán belüli lemondásért a kozmetika árának 50%-a fizetendő.</li>
      </ul>
      <div className="text-lg font-bold my-4 text-gray-900">Köszönöm a megértéseteket!</div>
    </div>
  )
}
