import Head from "next/head"
import Image from "next/image"
import Clients from "../components/Clients"
import Link from "next/link"
import { FaUser } from "react-icons/fa"
// import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Project Management</title>
        <meta name="project management" content="project management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/addClient">
        <button type="button" className="btn btn-secondary">
          <div className="d-flex align-items-center">
            <FaUser className="icon"/>
            <div>Add Client</div>
          </div>
        </button>
      </Link>
      <Clients/>
    </div>
  )
}
