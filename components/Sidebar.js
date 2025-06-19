import { User, FileText, Layers, Settings, ChevronRight, ChevronDown } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
const navLinks = [
  { name: 'Dashboard', icon: FileText },
  { name: 'Submissions', icon: Layers },
  { name: 'Profile', icon: User },
  { name: 'Settings', icon: Settings }
]
export default function Sidebar({ open, setOpen }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <>
      {/* Mobile Sidebar */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-64 flex-col bg-white border-r shadow-lg">
                <div className="flex items-center justify-between px-4 py-4 border-b">
                  <span className="font-bold text-lg">Springer</span>
                  <button
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                  {navLinks.map(link => (
                    <a
                      key={link.name}
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
                    >
                      <link.icon size={20} />
                      {link.name}
                    </a>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-0 flex-1" onClick={() => setOpen(false)} />
          </div>
        </Dialog>
      </Transition>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg">Springer</span>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setExpanded(!expanded)}
            aria-label="Expand/collapse sidebar"
          >
            {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        {expanded && (
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navLinks.map(link => (
              <a
                key={link.name}
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
              >
                <link.icon size={20} />
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </aside>
    </>
  )
}