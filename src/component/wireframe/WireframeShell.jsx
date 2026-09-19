import { Menu, Search, Bell, ChevronDown, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const customerLinks = [
  ['dashboard', 'Overview'], ['catalogue', 'Product catalogue'], ['calculator', 'Cost calculator'],
  ['rentals', 'My rentals'], ['notifications', 'Notifications'], ['profile', 'Profile'],
]

const adminLinks = [
  ['admin-dashboard', 'Admin overview'], ['product-management', 'Products'], ['category-management', 'Categories'],
  ['branch-management', 'Branches'], ['staff-management', 'Staff'], ['audit-logs', 'Audit logs'], ['assistant', 'Document / AI assistant'],
]

export function WireframeShell({ children, title, admin = false, wide = false }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const links = admin ? adminLinks : customerLinks

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-300 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
          <button onClick={() => setOpen(!open)} className="rounded border border-slate-300 p-2 lg:hidden" aria-label="Toggle navigation">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/wireframes/dashboard" className="shrink-0 text-lg font-bold tracking-tight">LANKA TOOLS <span className="font-normal text-slate-500">WIREFRAMES</span></Link>
          <div className="hidden flex-1 md:block"><label className="relative block max-w-md"><Search className="absolute left-3 top-2.5 text-slate-400" size={17} /><input className="w-full rounded border border-slate-300 py-2 pl-9 pr-3 text-sm" placeholder="Search tools, rentals or help" /></label></div>
          <div className="ml-auto flex items-center gap-3"><Link to="/wireframes/notifications" className="relative rounded p-2 hover:bg-slate-100" aria-label="Notifications"><Bell size={20} /><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-slate-700" /></Link><button className="hidden items-center gap-1 text-sm sm:flex">Alex Perera <ChevronDown size={16} /></button></div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1440px]">
        <aside className={`${open ? 'fixed inset-x-0 top-16 z-20 block bg-slate-900/20 p-4' : 'hidden'} w-72 shrink-0 border-r border-slate-300 bg-white lg:block lg:static lg:min-h-[calc(100vh-4rem)] lg:p-4`}>
          <nav className="space-y-1">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{admin ? 'Administration' : 'Customer portal'}</p>
            {links.map(([path, label]) => <Link key={path} onClick={() => setOpen(false)} to={`/wireframes/${path}`} className={`block rounded px-3 py-2 text-sm ${location.pathname.endsWith(path) ? 'bg-slate-800 font-medium text-white' : 'hover:bg-slate-100'}`}>{label}</Link>)}
            <div className="my-4 border-t border-slate-200" />
            <Link to={admin ? '/wireframes/dashboard' : '/wireframes/admin-dashboard'} className="block rounded px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">Switch to {admin ? 'customer' : 'admin'} view</Link>
          </nav>
        </aside>
        <main className={`min-w-0 flex-1 p-4 sm:p-6 ${wide ? 'max-w-none' : 'max-w-7xl'}`}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-medium uppercase tracking-wider text-slate-400">Wireframe / {admin ? 'Admin' : 'Customer'}</p><h1 className="text-2xl font-semibold">{title}</h1></div><span className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-500">Low-fidelity prototype</span></div>
          {children}
        </main>
      </div>
    </div>
  )
}

export const Card = ({ children, className = '' }) => <section className={`rounded border border-slate-300 bg-white p-4 shadow-sm ${className}`}>{children}</section>
export const Button = ({ children, secondary = false, className = '' }) => <button className={`rounded border px-4 py-2 text-sm font-medium ${secondary ? 'border-slate-300 bg-white' : 'border-slate-800 bg-slate-800 text-white'} ${className}`}>{children}</button>
export const Field = ({ label, placeholder = 'Enter value', type = 'text' }) => <label className="block text-sm font-medium text-slate-700">{label}<input type={type} placeholder={placeholder} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm font-normal" /></label>
export const SelectField = ({ label, value = 'Select an option' }) => <label className="block text-sm font-medium text-slate-700">{label}<select defaultValue="" className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm font-normal"><option value="">{value}</option></select></label>
