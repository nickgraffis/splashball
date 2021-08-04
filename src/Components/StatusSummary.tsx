import React from "react"
import { useContext } from "react"
import { AppContext } from "../App"
import { useUpdateMember } from "../MemberQueries"
import { MemberContext } from "./Members"

export const StatusSummary = () => {
  const { session } = useContext(AppContext)
  const { member } = useContext(MemberContext)
  if (!member) return null
  const { status, practices, dbid, session_dbid } = member
  const updateMember = useUpdateMember(dbid)

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

  const changeStatus = () => {
    updateMember.mutate({
      id: session_dbid,
      status: status === "Paid" ? "Unpaid" : "Paid"
    })
  }

  return (
    <span>
      <span className="relative">
        {underline()}
        <span onClick={changeStatus} className="cursor-pointer inline-block relative z-10 transform transition-transform duration-150 active:scale-95">
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