import '../../../src/app/globals.css'

export default function FallbackIndexPage() {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">Fallback index page</h1>
      <p className="text-center text-lg mt-2">You can generate any path you want in /fallback</p>
      <p className="text-center text-lg mt-2">But the length of your path name should be 5 or more.</p>
      <p className="text-center text-lg mt-2">(e.g. Enter /fallback/hello-world) in the URL bar</p>
    </main>
  )
}