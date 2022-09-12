import logo from "../assets/logo.png"
import Link from "next/link"
import Image from "next/image"

export default function Header()
{
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <Link href="/"> 
          <a className="navbar-brand">
            <div className="d-flex align-items-center">
              <Image alt="logo" src={logo} className="mr-2"/>
              <div>ProjectMgmt</div>
            </div>
          </a>       
        </Link>
      </div>
    </nav>
  )
}