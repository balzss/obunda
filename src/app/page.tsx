export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="flex flex-col items-center p-8">
        <h2 className="text-5xl text-center">Óbunda Kutyakozmetika</h2>
        <nav className="flex gap-4 mt-8">
          <a href="#" className="hover:underline">Rólam</a>
          <a href="#Áraim" className="hover:underline">Áraim</a>
          <a href="#" className="hover:underline">Kapcsolat</a>
          <a href="#" className="hover:underline">Házirend</a>
        </nav>
        <div className="w-full max-w-2xl my-12 text-black">
          <p>
            Hamarosan... :)
          </p>
        </div>
      </div>
    </div>
  );
}
