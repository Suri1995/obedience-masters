import Image from "next/image";

const leftIds = [201, 215, 228];
const rightIds = [231, 240, 250];

export function MeetExpert() {
  return (
    <section className="bg-cream py-24">
      <div className="container-px mx-auto max-w-[1200px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          <div className="grid grid-cols-3 gap-3">
            {leftIds.map((id, i) => (
              <div
                key={id}
                className={`relative aspect-square overflow-hidden rounded-2xl ${i === 2 ? "col-span-1" : ""}`}
              >
                <Image
                  src={`https://placedog.net/300/300?id=${id}`}
                  alt="Dog trained by Obedience Masters"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              Meet the Expert <span className="text-yellow-dark">Behind Your Dog&rsquo;s Transformation.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              With professional experience and certification, our trainer
              uses positive, personalised methods to help dogs build better
              behaviour, confidence, and a stronger bond with their parents.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-block rounded-full bg-yellow px-7 py-3 text-sm font-semibold text-black shadow-[0_10px_24px_-8px_rgba(255,181,0,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Connect with Dog Trainer
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {rightIds.map((id) => (
              <div key={id} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={`https://placedog.net/300/300?id=${id}`}
                  alt="Dog trained by Obedience Masters"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
