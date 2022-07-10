import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const Navbar = () => {
  const { data } = useSession()

  return (
    <nav className='px-2 py-2.5'>
      <div className='container flex flex-wrap items-center justify-between mx-auto border-b pb-2.5 border-gray-200'>
        <a href='https://flowbite.com/' className='flex items-center'>
          <span className='self-center text-xl font-semibold whitespace-nowrap'>
            Litter
          </span>
        </a>
        <div>
          {data?.user?.image ? (
            <Image
              className='w-8 h-8 rounded-full'
              width={32}
              height={32}
              src={data.user.image}
              alt={`${data.user.name} avatar`}
              objectFit='contain'
            />
          ) : (
            <div className='relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full'>
              <svg
                className='absolute w-10 h-10 text-gray-100 -left-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
