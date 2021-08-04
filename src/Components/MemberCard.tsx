import React, { useState } from "react"
import { useContext } from "react"
import Swipe from "react-easy-swipe"
import { useSwipeable } from 'react-swipeable';
import { AppContext } from "../App"
import { useUpdateMember } from "../MemberQueries"
import { Check } from "./Icons/Check"
import { Eye } from "./Icons/Eye"
import { Member } from "./Member"
import { MemberContext } from "./Members"
import { MemberStatusIndicator } from "./MemberStatusIndicator"

type Props = {
  member: Member
}

export const MemberCard = ({ member }: Props) => {
  const { session_dbid, dbid, name, team, status, emails, practices, id } = member
  const { session } = useContext(AppContext)
  const { date, setSelectedMember } = useContext(MemberContext)
  const updateMember = useUpdateMember(dbid)
  const [showOptions, setShowOptions] = useState(false)

  const markAttendance = (event: any) => {
    if (event.target.classList.contains("view")) return null
    if (!practices) {
      updateMember.mutate({
        member: dbid,
        practices: [`${date?.getMonth()}/${date?.getDate()}`],
        ...(team) && { team },
        name: session
      })
      return null
    }
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

  const hover = () => {
    setShowOptions(true)
  }
  const autoClose = () => {
    setTimeout(() => {
      setShowOptions(false)
    }, 3000)
  }

  const swipes = useSwipeable({
    delta: 50,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    onSwipedRight: () => { setShowOptions(true); autoClose() },
    onSwipedLeft: () => { setShowOptions(false) },
  })

  return (
    <div {...swipes}>
      <div onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} onClick={markAttendance} className="w-full overflow-hidden rounded-xl bg-blueGray-600 bg-opacity-50 opacity-100 flex items-center transform transition-transform duration-150 active:scale-95 p-4">
        <div className={`text-white flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-150 ${showOptions ? 'w-12 pr-4' : 'w-0'}`}>
          <button className="view" onClick={() => setSelectedMember && setSelectedMember(member)}>
            <Eye className={`flex-shrink-0 h-6 w-6 view`}/>
          </button>
        </div>
        <div className="flex-grow truncate flex-1">
          <div className="font-bold text-lg flex space-x-2 items-center">
            <span className="truncate">{name}</span>
            <div className="flex space-x-1">
              <MemberStatusIndicator status={status} />
              { !(emails && emails.length && id) && <MemberStatusIndicator status="no-info" /> }  
            </div>
          </div>
          <p className="text-blueGray-400">{team}</p>
        </div>
        <div className="pl-4 whitespace-nowrap">
          { 
            date && practices && practices.includes(`${date?.getMonth()}/${date?.getDate()}`) ? <div>
              <Check className="h-8 w-8" />
            </div> 
            : <div className="h-7 w-7 rounded-full border-[3px] border-white"></div>
            
          }
        </div>
      </div>
    </div>
  )
}