import React from "react"

type Props = {
  date: Date
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const months = [ 
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const isToday = (date: Date) => {
  const today = new Date()
  return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()
}

const isYesterday = (date: Date) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.getFullYear() === date.getFullYear() && yesterday.getMonth() === date.getMonth() && yesterday.getDate() === date.getDate()
}

const isTomorrow = (date: Date) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.getFullYear() === date.getFullYear() && tomorrow.getMonth() === date.getMonth() && tomorrow.getDate() === date.getDate()
}

const humanDay = (day: number) => {
  const j = day % 10
  const k = day % 100

  if (j === 1 && k !== 11) {
    return day + "st"
  }
  if (j === 2 && k !== 12) {
    return day + "nd"
  }
  if (j === 3 && k !== 13) {
    return day + "rd"
  }
  return day + "th"
}

const simplifyDate = (date: Date) => {
  console.log(date)
  const dayOfWeek = days[date.getDay()]
  const month = months[date.getMonth()]
  const day = humanDay(date.getDate())
  
  if (isToday(date)) {
    return `Today, ${dayOfWeek}, ${month} ${day}`
  } else if (isYesterday(date)) {
    return `Yesterday, ${dayOfWeek}, ${month} ${day}`
  } else if (isTomorrow(date)) {
    return `Tomorrow, ${dayOfWeek}, ${month} ${day}`
  } 

  return `${dayOfWeek}, ${month} ${day}`
}

export const SimpleDate = ({ date }: Props) => {
  return (
    <span className="text-sm">{simplifyDate(date)}</span>
  )
}