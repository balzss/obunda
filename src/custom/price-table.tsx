import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const priceList = [
  {
    name: 'Yorkshire Terrier',
    price: 9000,
  },
  {
    name: 'Máltai Selyemkutya',
    price: 9500,
  },
  {
    name: 'Bichon Frisé',
    price: 11500,
  },
  {
    name: 'Shih Tzu',
    price: 11000,
  },
  {
    name: 'Uszkár (Törpe)',
    price: 12000,
  },
  {
    name: 'West Highland White Terrier (Westie)',
    price: 11500,
  },
  {
    name: 'Törpe Schnauzer',
    price: 12500,
  },
  {
    name: 'Tacskó (Szálkás szőrű)',
    price: 9000,
  },
  {
    name: 'Pomerániai Törpespicc',
    price: 10500,
  },
  {
    name: 'Francia Bulldog',
    price: 7500,
  },
  {
    name: 'Cocker Spániel',
    price: 14000,
  },
  {
    name: 'Golden Retriever',
    price: 18000,
  },
  {
    name: 'Labrador Retriever',
    price: 16000,
  },
  {
    name: 'Német Juhászkutya',
    price: 20000,
  },
  {
    name: 'Beagle',
    price: 9500,
  }
];

export default function TableDemo() {
  return (
    <Table>
      <TableBody>
        {priceList.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-base">{item.name}</TableCell>
            <TableCell className="text-right text-nowrap">{item.price} Ft.</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
