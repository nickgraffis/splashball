import React from "react"
import { useContext } from "react"
import { useUpdateMember } from "../MemberQueries"
import { Check } from "./Icons/Check"
import { Member } from "./Member"
import { MemberContext } from "./Members"
import { MemberStatusIndicator } from "./MemberStatusIndicator"

type Props = {
  member: Member
}

export const MemberCard = ({ member: { session_dbid, dbid, name, team, status, emails, practices }}: Props) => {
  const { date } = useContext(MemberContext)
  const updateMember = useUpdateMember(dbid)

  const markAttendance = () => {
    if (practices.includes(`${date?.getMonth()}/${date?.getDate()}`)) {
      updateMember.mutate({
        id: session_dbid,
        practices: practices.splice(practices.indexOf(`${date?.getMonth()}/${date?.getDate()}`) + 1, 1)
      })
    } else {
      updateMember.mutate({
        id: session_dbid,
        practices: practices.concat([`${date?.getMonth()}/${date?.getDate()}`])
      })
    }
  }

  return (
    <div onClick={markAttendance} className="w-full rounded-xl bg-blueGray-600 bg-opacity-50 opacity-100 p-4 flex justify-between items-center transform transition-transform duration-150 active:scale-90">
      <div>
        <div className="font-bold text-lg flex space-x-2 items-center">
          <span>{name}</span>
          <MemberStatusIndicator status={status} />
          { !emails.length && <MemberStatusIndicator status="no-info" /> }
        </div>
        <p className="text-blueGray-400">{team}</p>
      </div>
      <div>
        { 
          date && practices.includes(`${date?.getMonth()}/${date?.getDate()}`) ? <div>
            <Check className="h-8 w-8" />
          </div> 
          : <div className="h-7 w-7 rounded-full border-[3px] border-white"></div>
          
        }
      </div>
    </div>
  )
}