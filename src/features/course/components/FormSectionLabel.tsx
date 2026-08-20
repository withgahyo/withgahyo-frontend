function FormSectionLabel({ htmlFor, children }: { htmlFor?: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="inline-block w-fit self-start rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-brand-lime"
    >
      {children}
    </label>
  )
}

export default FormSectionLabel
