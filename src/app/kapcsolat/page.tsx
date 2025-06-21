import Link from 'next/link'

export default function KapcsolatPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Kapcsolat</h2>

      <div className="flex flex-col gap-2">
        <p className="text-black">
          <span className="font-bold">Telefon:</span>{' '}
          <Link href="tel:+36305866487">+36 30 586 6487</Link>
        </p>
        <p className="text-black">
          <span className="font-bold">Email:</span>{' '}
          <Link href="mailto:bakacskatalin@gmail.com">bakacskatalin@gmail.com</Link>
        </p>
        <p className="text-black">
          <span className="font-bold">Cím:</span> Budapest, Tímár u. 31, 1034
        </p>

        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884.494633154932!2d19.035678955774635!3d47.534235705000626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d9503a5e570b%3A0x215866a61c3b51ec!2s%C3%93bunda%20kutyakozmetika!5e0!3m2!1sen!2shu!4v1750495364637!5m2!1sen!2shu"
            width="100%"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
