import React, { useState } from "react";
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
  date?: Date
};

export const MemberContext = React.createContext<Partial<MemberContextProps>>({});

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState(undefined);
  const [date, setDate] = useState(new Date())
  const [showEditor, setShowEditor] = useState(false);

  const { data: members, isLoading, isError, isSuccess } = useMembers();

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
      date
    }}>
      <EditMember showing={showEditor} />
      <Member />
      <NavBar />
      <div className="w-full h-screen bg-gradient-to-b from-[#201F37] to-[#335575] text-white">
        <div className="px-6">
          <div className="w-full text-center font-semibold text-lg py-6 flex justify-between items-center">
            <div onClick={prevDay} className="p-1 rounded-md active:bg-blueGray-400 active:bg-opacity-25 transition-colors duration-150">
              <ChevronLeft />
            </div>
            <SimpleDate date={date} />
            <div onClick={nextDay} className="p-1 rounded-md active:bg-blueGray-400 active:bg-opacity-25 transition-colors duration-150">
              <ChevronRight />
            </div>
          </div>
          <div className="space-y-3">
            {
              isSuccess && members.map((member: Member, index: number) => (
                <MemberCard key={index} member={member} />
              ))
            }
          </div>
        </div>
      </div>
    </MemberContext.Provider>
  )
}