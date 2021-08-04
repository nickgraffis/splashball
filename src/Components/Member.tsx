import React, { useContext, useState } from "react";
import { useUpdateMember } from "../MemberQueries";
import { Check } from "./Icons/Check";
import { VerticalDots } from "./Icons/VerticalDots";
import { MemberContext } from "./Members";
import { MemberStatusIndicator } from "./MemberStatusIndicator";
import { StatusSummary } from "./StatusSummary";

export type Member = {
  dbid: string,
  session_dbid: string,
  id: number,
  emails: string[],
  name: string,
  status: string,
  team: string,
  practices: string[]
}

export const Member = () => {
  const { member, setSelectedMember } = useContext(MemberContext);
  if (!member) return null
  const { dbid, id, emails, name, status, team, practices, session_dbid } = member
  const updateMember = useUpdateMember(dbid)
  const [nameValue, setNameValue] = useState(name)
  const [editing, setEditing] = useState(false);
  const [teamValue, setTeamValue] = useState(team);
  const [idValue, setIdValue] = useState(id);
  const clickAway = (event: any) => {
    console.log(event.target.id)
    if (event.target.id === 'wrapper' && setSelectedMember) setSelectedMember(undefined)
  }

  const save = () => {
    updateMember.mutate({
      ...(teamValue) && { id: session_dbid },
      ...(nameValue || idValue || teamValue) && { member: dbid },
      ...(nameValue) && { name: nameValue },
      ...(teamValue) && { team: teamValue },
      ...(idValue) && { caId: idValue }
    })
    setEditing(false)
  }

  return (
    <div onClick={clickAway} className="z-30 w-full h-screen fixed bg-blueGray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm text-blueGray-300 flex flex-col">
      <div id="wrapper" className="flex-grow items-end flex px-6">
        <div className="w-full self-center bg-white rounded-xl p-4 flex flex-col space-y-2 border-b-[6px] border-cyan-600">
          <div className="w-full flex justify-between items-center">
            {
              editing ? <input onChange={(event) => setNameValue(event.target.value)} className=" focus:outline-none appearance-none w-full text-2xl font-bold text-blueGray-600" placeholder="Name" value={nameValue}/>
              : <span className="text-2xl font-bold text-blueGray-600 truncate">{name}</span>
            }
            { editing ? <button onClick={save}>
                <Check className="h-5 w-5 text-blueGray-400 flex-shrink-0" />
              </button> 
              : <button onClick={() => setEditing(true)}>
                <VerticalDots className="h-5 w-5 text-blueGray-400 flex-shrink-0" />
              </button>
            }
          </div>
          {
            editing ? <input onChange={(event) => setTeamValue(event.target.value)} className=" focus:outline-none appearance-none w-full text-blueGray-600 font-semibold" placeholder="Team" value={teamValue}/>
            : <span className="text-blueGray-600 font-semibold">{team}</span>
          }
          {
            emails.map((email: string, index: number) => {
              <div key={index} className="text-blueGray-600 flex space-x-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blueGray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                </svg>
                <span>{email}</span>
              </div>
            })
          }
          <div className="text-blueGray-600 flex space-x-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blueGray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            {
              editing ? <input type="number" onChange={(event: any) => setIdValue(event.target.value)} className=" focus:outline-none appearance-none w-full" placeholder="012345" value={idValue}/>
              : <span>{id}</span>
            }
          </div>
          <div className="text-blueGray-600 flex space-x-1 items-start">
            <MemberStatusIndicator status={status} className="flex-shrink-0"/>
            <StatusSummary />
          </div>
        </div>
      </div>
    </div>
  );
};