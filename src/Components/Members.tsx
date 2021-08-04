import React, { useState } from "react";
import { useEffect } from "react";
import { useMembers } from "../MemberQueries";
import { EditMember } from "./EditMember";
import { ChevronLeft } from "./Icons/ChevronLeft";
import { ChevronRight } from "./Icons/ChevronRight";
import { Member } from "./Member";
import { MemberCard } from "./MemberCard";
import { NavBar } from "./NavBar";
import { SimpleDate } from "./SimpleDate";

type MemberContextProps = { 
  member?: Member,
  setSelectedMember: (member: Member | undefined) => void,
  showEditor: boolean,
  setShowEditor: (value: boolean) => void,
  date: Date
};

export const MemberContext = React.createContext<MemberContextProps>({
  member: {
    id: 1,
    dbid: "",
    session_dbid: "",
    emails: [],
    name: "",
    status: "",
    team: "",
    practices: []
  },
  date: new Date(),
  showEditor: false,
  setShowEditor: () => {},
  setSelectedMember: () => {}
});

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined);
  const [date, setDate] = useState(new Date())
  const [showEditor, setShowEditor] = useState(false);

  const { data: members, isLoading, isError, isSuccess, refetch } = useMembers();
  const reactQuery = useMembers();

  useEffect(() => {
    console.log(reactQuery)
  }, [reactQuery])

  const prevDay = () => {
    setDate(
      new Date(
        date.setDate(
          date.getDate() - 1
        )
      )
    )
  }

  const nextDay = () => {
    setDate(
      new Date(
        date.setDate(
          date.getDate() + 1
        )
      )
    )
  }

  return (
    <MemberContext.Provider value={{
      member: selectedMember,
      setSelectedMember,
      showEditor,
      setShowEditor,
      date
    }}>
      <EditMember />
      <Member />
      <div className="min-h-screen bg-gradient-to-b from-[#201F37] to-[#335575] text-white pb-4">
        <div className="lg:max-w-2xl">
          <NavBar />
          <div className="px-6">
            <div className="w-full text-center font-semibold text-lg py-6 flex justify-between items-center">
              <button onClick={prevDay}>
                <ChevronLeft />
              </button>
              <SimpleDate date={date} />
              <button onClick={nextDay}>
                <ChevronRight />
              </button>
            </div>
            <div className="space-y-3">
              {
                isLoading && new Array(4).fill(0).map((_: any, index: number) => (
                  <div key={index} className="w-full overflow-hidden rounded-xl bg-blueGray-400 bg-opacity-50 opacity-100 flex items-center p-4 h-12 animate-pulse">
                    &nbsp;
                  </div>
                ))
              }
              {
                isError && <div onClick={() => refetch()} className="w-full overflow-hidden rounded-xl bg-red-600 bg-opacity-50 opacity-100 flex items-center p-4 cursor-pointer active:scale-90 transform transition-transform duration-150 ease-in-out">
                    <p className="text-white font-semibold text-center w-full">There was an error. Try again.</p>
                  </div>
              }
              {
                (isSuccess && members) && members.filter((m: Member) => (!m.practices || ( m.practices && !m.practices.includes(`${date?.getMonth()}/${date?.getDate()}`))))
                  .sort((a: Member, b: Member) => (b.practices?.length || 0) > (a.practices?.length || 0))
                  .map((member: Member, index: number) => (
                    <MemberCard key={index} member={member} />
                  ))
              }
              {
                (isSuccess && members) && members.filter((m: Member) => (date && m.practices && m.practices.includes(`${date?.getMonth()}/${date?.getDate()}`)))
                  .map((member: Member, index: number) => (
                    <MemberCard key={index} member={member} />
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </MemberContext.Provider>
  )
}