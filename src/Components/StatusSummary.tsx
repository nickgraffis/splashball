import React from "react"
import { useContext } from "react"
import { AppContext } from "../App"

type Props = {
  status: string,
  practices: string[]
}

export const StatusSummary = ({ status, practices }: Props) => {
  const { session } = useContext(AppContext)
  
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
        return 'bg-cyan-400'
    }
  }

  const underline = () => {
    return <span className={`w-full absolute h-1 ${determineStatus()} bottom-0 bg-opacity-100`}>
    </span>
  }

  return (
    <span>
      <span className="relative">
        {underline()}
        <span className="relative z-10">
          {status || "Inactive"}
        </span>
      </span>
      , attended 
      <span className="relative mx-1">
        {underline()}
        <span className="relative z-10">
          {practices?.length || 0}
        </span>
      </span> 
      practices in 
      <span className="relative mx-1">
        {underline()}
        <span className="relative z-10">
          {session}
        </span>
      </span>
      .
    </span>
  )
}