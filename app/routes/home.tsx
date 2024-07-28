import { Link, Outlet } from "@remix-run/react"

type HomeRootProps = {}

export default function HomeRoot({}: HomeRootProps) {
  return (
    <>
      <ul className="flex gap-2">
        <Link
          prefetch="none"
          className="text-blue-500 visited:text-indigo-600 hover:text-blue-400 transition-all hover:underline"
          to="/home/brunorpinho"
        >
          brunorpinho
        </Link>
        <Link
          prefetch="none"
          className="text-blue-500 visited:text-indigo-600 hover:text-blue-400 transition-all hover:underline"
          to="/home/xtecox"
        >
          xtecox
        </Link>
        <Link
          prefetch="none"
          className="text-blue-500 visited:text-indigo-600 hover:text-blue-400 transition-all hover:underline"
          to="/home/maurodesouza"
        >
          maurodesouza
        </Link>
        <Link
          prefetch="none"
          className="text-blue-500 visited:text-indigo-600 hover:text-blue-400 transition-all hover:underline"
          to="/home/vitormarkis"
        >
          vitormarkis
        </Link>
      </ul>
      JUST HOME
      <Outlet />
    </>
  )
}
