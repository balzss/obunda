'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Your gallery images from public/gallery folder
const dogPhotos = [
  {
    src: '/gallery/00759817-D562-4E49-8753-A9E60E50AF2C.jpeg',
    alt: 'Kutyakozmetikai munka - Szép kutyus ápolás után',
    thumbnail: '/gallery/00759817-D562-4E49-8753-A9E60E50AF2C.jpeg',
  },
  {
    src: '/gallery/466C650B-65DC-4036-91A6-990FB797055E.jpeg',
    alt: 'Profi kutyakozmetikai szolgáltatás',
    thumbnail: '/gallery/466C650B-65DC-4036-91A6-990FB797055E.jpeg',
  },
  {
    src: '/gallery/93B00D9D-F300-48A4-A4F5-0F841AED247A.jpeg',
    alt: 'Gondos kutyaápolás eredménye',
    thumbnail: '/gallery/93B00D9D-F300-48A4-A4F5-0F841AED247A.jpeg',
  },
  {
    src: '/gallery/A2D07E18-84F1-4F12-92D9-BBD748053A3B.jpeg',
    alt: 'Óbunda kutyakozmetika - elégedett négylábú',
    thumbnail: '/gallery/A2D07E18-84F1-4F12-92D9-BBD748053A3B.jpeg',
  },
  {
    src: '/gallery/BE9DDC61-0DC6-4FF9-AD77-C9BAF5BA9774.jpeg',
    alt: 'Szakszerű kutyaápolás és szőrzetkezelés',
    thumbnail: '/gallery/BE9DDC61-0DC6-4FF9-AD77-C9BAF5BA9774.jpeg',
  },
  {
    src: '/gallery/C33A2213-A03D-4CD0-BAA4-7DC887F7871E.jpeg',
    alt: 'Gyönyörű eredmény kozmetikai kezelés után',
    thumbnail: '/gallery/C33A2213-A03D-4CD0-BAA4-7DC887F7871E.jpeg',
  },
  {
    src: '/gallery/CC68854F-E3DC-49A0-AE71-E62B64C34C45.jpeg',
    alt: 'Boldog kutya a szépségápolás után',
    thumbnail: '/gallery/CC68854F-E3DC-49A0-AE71-E62B64C34C45.jpeg',
  },
  {
    src: '/gallery/D0849D5D-4AE3-45DC-81FC-68C65009A454.jpeg',
    alt: 'Professzionális kutyakozmetikai munka',
    thumbnail: '/gallery/D0849D5D-4AE3-45DC-81FC-68C65009A454.jpeg',
  },
  {
    src: '/gallery/F0F365AF-336F-47AD-9005-A1510C033D60.jpeg',
    alt: 'Óbunda kutyakozmetika - szép eredmény',
    thumbnail: '/gallery/F0F365AF-336F-47AD-9005-A1510C033D60.jpeg',
  },
  {
    src: '/gallery/FCD7C2F1-CBC2-4076-9E8B-E236269C12D6.jpeg',
    alt: 'Gondos kutyaápolás és törődés',
    thumbnail: '/gallery/FCD7C2F1-CBC2-4076-9E8B-E236269C12D6.jpeg',
  },
  {
    src: '/gallery/FF648F21-75D8-4BEE-AC8E-19F915F83F8A.jpeg',
    alt: 'Kutyakozmetikai szolgáltatás eredménye',
    thumbnail: '/gallery/FF648F21-75D8-4BEE-AC8E-19F915F83F8A.jpeg',
  },
  {
    src: '/gallery/IMG_0466.png',
    alt: 'Óbunda kutyakozmetika - munkám eredménye',
    thumbnail: '/gallery/IMG_0466.png',
  },
  {
    src: '/gallery/IMG_0513.png',
    alt: 'Szakmai munka és gondosság',
    thumbnail: '/gallery/IMG_0513.png',
  },
  {
    src: '/gallery/IMG_0522.png',
    alt: 'Elégedett kutya a kezelés után',
    thumbnail: '/gallery/IMG_0522.png',
  },
  {
    src: '/gallery/Óbunda Kutyakozmetika Szőrös barátaink szépsége és ápolása a múlt eleganciájával. - 2.png',
    alt: 'Óbunda Kutyakozmetika - szőrös barátaink szépsége',
    thumbnail:
      '/gallery/Óbunda Kutyakozmetika Szőrös barátaink szépsége és ápolása a múlt eleganciájával. - 2.png',
  },
]

export default function GaleriaPage() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const slides = dogPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }))

  const openLightbox = (photoIndex: number) => {
    setIndex(photoIndex)
    setOpen(true)
  }

  const handleImageError = (photoIndex: number) => {
    setImageErrors((prev) => ({ ...prev, [photoIndex]: true }))
  }

  const handleImageLoad = (photoIndex: number) => {
    setImageErrors((prev) => ({ ...prev, [photoIndex]: false }))
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Galéria</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Itt tekintheted meg munkáim eredményeit és a boldog kutyusokat, akik már megfordultak nálam.
        Minden kép egy-egy sikertörténet, egy-egy elégedett gazdi és szép kutyus bizonyítéka.
        Kattints bármelyik képre a nagyobb méretű megjelenítéshez!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {dogPhotos.map((photo, photoIndex) => (
          <div
            key={photoIndex}
            className="relative aspect-square cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group"
            onClick={() => openLightbox(photoIndex)}
          >
            {imageErrors[photoIndex] ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Kép betöltése sikertelen</p>
                </div>
              </div>
            ) : (
              <Image
                src={photo.thumbnail}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 50vw, 33vw"
                onError={() => handleImageError(photoIndex)}
                onLoad={() => handleImageLoad(photoIndex)}
              />
            )}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-600 text-sm">
        <p>💡 Tipp: Kattints bármelyik képre a nagyítási nézethez!</p>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        carousel={{
          finite: true,
        }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </section>
  )
}
