import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Link href={"/login"}>
        <button className="m-5 bg-orange-400 p-5 rounded-xl">LOGIN</button>
      </Link>
      <Link href={"/register"}>
        <button className="m-5 bg-orange-400 p-5 rounded-xl">REGISTER</button>
      </Link>
    </div>
  );
}
