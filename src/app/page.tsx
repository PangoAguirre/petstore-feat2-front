import Link from "next/link";

export default function Home() {
  const routes = [
    "/admin/initial-config",
    "/admin/new-supplier-manager",
    "/dashboard",
    "/login",
    "/recover-password",
    "/signup",
    "/suppliers/0",
    "/suppliers/new",
    "/suppliers",
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-4">
        <h1 className="w-full text-2xl text-center">PetStore Manager</h1>
        <h2 className="w-full text-center">Current routes</h2>
        <div>
          {routes.map((r, idx) => (
            <Link
              key={idx}
              href={r}
              className="inline-block mx-2 text-blue-600 hover:text-[1.2rem] transition-all ease-out"
            >
              {r}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
