import React from "react"

type Props = {
  status: string
}

export const MemberStatusIndicator = ({ status }: Props) => {
  const determineStatus = () => {
    switch (status) {
      case "Paid":
        return 'bg-green-400'
      case "Unpaid":
        return 'bg-yellow-400'
      case "Inactive":
        return 'bg-cyan-400'
      case "no-info":
        return 'bg-rose-400'
      default:
        return 'bg-purple-400'
    }
  }

  return (
    <div className={`${determineStatus()} w-2 h-2 rounded-full`}></div>
  )
}