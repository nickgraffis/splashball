import React from "react"
import netlifyIdentity from "netlify-identity-widget"

export const Login = () => {
return <div className="min-h-screen w-full bg-gradient-to-b from-[#201F37] to-[#335575] text-white pb-4 flex items-center justify-center px-4">
  <div onClick={() => netlifyIdentity.open()} className="w-full overflow-hidden rounded-xl bg-blueGray-600 bg-opacity-50 opacity-100 flex items-center p-4 cursor-pointer active:scale-90 transform transition-transform duration-150 ease-in-out">
    <p className="text-white font-semibold text-center w-full">Login</p>
  </div>
</div>
}