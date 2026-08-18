interface OnboardingHeadingProps {
  title: string
  description?: string
}

function OnboardingHeading({ title, description }: OnboardingHeadingProps) {
  return (
    <div className="mt-6">
      <h1 className="whitespace-pre-line text-heading font-bold leading-snug text-ink">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-ink/60">{description}</p>
      )}
    </div>
  )
}

export default OnboardingHeading
