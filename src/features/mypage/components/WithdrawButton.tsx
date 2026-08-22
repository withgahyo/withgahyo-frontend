interface WithdrawButtonProps {
  onClick?: () => void
  disabled?: boolean
}

function WithdrawButton({ onClick, disabled = false }: WithdrawButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mx-auto block px-4 py-2 text-sm font-semibold text-red-500 underline-offset-4 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-55"
    >
      회원 탈퇴
    </button>
  )
}

export default WithdrawButton
