import { useMemo, useState, type FormEvent } from 'react'
import { form as formCopy, cta } from '../../content/copy'

type Errors = Partial<Record<'name' | 'email' | 'company', string>>

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function DemoForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const canSubmit = useMemo(
    () => Boolean(name.trim() && isValidEmail(email.trim()) && company.trim() && !submitting),
    [name, email, company, submitting],
  )

  function validate(): Errors {
    const next: Errors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!isValidEmail(email.trim())) next.email = 'Enter a valid email address.'
    if (!company.trim()) next.company = 'Please enter your city or store preference.'
    return next
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 650))
    console.info('[Ambot365 visit request]', {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      role,
      message: message.trim(),
    })
    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="surface-card p-6 sm:p-8" role="status">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#e7c960] font-bold text-xl mb-4">
          ✓
        </div>
        <h3 className="font-serif text-2xl text-white">{cta.successTitle}</h3>
        <p className="body-fluid mt-2 text-[#aca6a2]">{cta.successBody}</p>
        <button
          type="button"
          className="btn-gold-outline tap-lg mt-6 inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold"
          onClick={() => {
            setSuccess(false)
            setName('')
            setEmail('')
            setCompany('')
            setRole('')
            setMessage('')
          }}
        >
          {formCopy.reset}
        </button>
      </div>
    )
  }

  return (
    <form className="surface-card flex flex-col gap-4.5 p-6 sm:p-8" onSubmit={onSubmit} noValidate>
      <Field
        id="demo-name"
        label={formCopy.fields.name}
        value={name}
        onChange={setName}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id="demo-email"
        label={formCopy.fields.email}
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id="demo-company"
        label={formCopy.fields.company}
        value={company}
        onChange={setCompany}
        error={errors.company}
        autoComplete="address-level2"
      />
      <div>
        <label htmlFor="demo-role" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-[#e7c960]">
          {formCopy.fields.role}
        </label>
        <select
          id="demo-role"
          className="tap-lg w-full rounded-xl border border-[#d4af37]/25 bg-[#070604] px-3.5 text-sm text-white focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" className="bg-[#070604] text-[#aca6a2]">Select occasion…</option>
          {formCopy.roles.map((r) => (
            <option key={r} value={r} className="bg-[#070604] text-white">
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="demo-message" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-[#e7c960]">
          {formCopy.fields.message}
        </label>
        <textarea
          id="demo-message"
          rows={3}
          className="w-full rounded-xl border border-[#d4af37]/25 bg-[#070604] px-3.5 py-3 text-sm text-white focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl placeholder-[#625954]"
          value={message}
          placeholder="Tell us what style or pieces you are looking for..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-gold tap-lg mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? formCopy.submitting : formCopy.submit}
      </button>
    </form>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-[#e7c960]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className={`tap-lg w-full rounded-xl border bg-[#070604] px-3.5 text-sm text-white focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl ${
          error ? 'border-red-500' : 'border-[#d4af37]/25'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
