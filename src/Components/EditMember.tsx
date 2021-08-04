import React, { useState, useContext } from "react";
import { useCreateMember } from "../MemberQueries";
import { MemberContext } from "./Members";

type Member = {
  ref: string,
  id: string,
  emails: string[],
  name: string,
  status: string,
  team: string,
  practices: Date[]
}

export const EditMember = () => {
  const { member, showEditor, setShowEditor } = useContext(MemberContext);
  const [field, setField] = useState('name')
  const [nameValue, setNameValue] = useState(member?.name || '')
  const [emailsValue, setEmailsValue] = useState(member?.emails.join(', ') || '')
  const [idValue, setIdValue] = useState(member?.id || '')
  const [statusValue, setStatusValue] = useState(member?.status || '')
  const [teamValue, setTeamValue] = useState(member?.team || '')
  const createMember = useCreateMember()

  const submit = () => {
    createMember.mutate({
      name: nameValue,
      emails: emailsValue,
      id: idValue,
      team: teamValue
    })
    setNameValue('')
    setEmailsValue('')
    setIdValue('')
    setTeamValue('')
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      submit();
      setShowEditor && setShowEditor(false)
    }
  }

  if (!showEditor || (!showEditor && member)) return null

  const renderInputSwtich = () => {
    switch (field) {
      case 'name':
        return <input 
        onKeyUp={onKeyUp}
        className="apperance-none text-2xl w-full focus:outline-none px-2 font-bold text-blueGray-600 placeholder-current" 
        placeholder="Harry Potter" 
        onChange={(event) => setNameValue(event.target.value)}
        value={nameValue}
        />
        break;
      case 'emails':
        return <input
        onKeyUp={onKeyUp}
        className="apperance-none text-lg w-full focus:outline-none px-2 font-medium text-blueGray-600 placeholder-current"
        placeholder="harry@hw.edu, draco@hw.edu"
        onChange={(event) => setEmailsValue(event.target.value)}
        value={emailsValue}
        />
      case 'team':
        return <input
        onKeyUp={onKeyUp}
        className="apperance-none text-2xl w-full focus:outline-none px-2 font-bold text-blueGray-600 placeholder-current"
        placeholder="SplashBall"
        onChange={(event) => setTeamValue(event.target.value)}
        value={teamValue}
        />
      case 'id':
        return <input
        onKeyUp={onKeyUp}
        className="apperance-none text-2xl w-full focus:outline-none px-2 font-bold text-blueGray-600 placeholder-current"
        placeholder="1234567"
        type="number"
        onChange={(event) => setIdValue(event.target.value)}
        value={idValue}
        />
      default:
        break;
    }
  }

  const indicatorLocation = () => {
    switch (field) {
      case 'name':
        return '-translate-x-12';
      case 'emails':
        return '-translate-x-28';
      case 'team':
        return 'translate-x-4';
      case 'id':
        return 'translate-x-20';
      default:
        break;
    }
  }

  return (
    <div className="z-40 w-full h-screen fixed bg-blueGray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm text-blueGray-300 flex flex-col">
      <div className="w-full flex justify-start p-6">
        <button onClick={() => setShowEditor && setShowEditor(false)} className="font-semibold">Cancel</button>
      </div>
      <div className="flex-grow items-end flex px-6">
        <div className="w-full self-center bg-white rounded-xl p-4 flex flex-col space-y-2 border-b-[6px] border-cyan-600">
          {renderInputSwtich()}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-6 p-6 relative">
        <div className={`absolute rounded-full bg-cyan-400 h-3 w-3 top-2 transform transition-transform duration-150 ease-in ${indicatorLocation()}`}></div>
        <button onClick={() => setField('emails')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button onClick={() => setField('name')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button onClick={() => setField('team')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button onClick={() => setField('id')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </button>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}