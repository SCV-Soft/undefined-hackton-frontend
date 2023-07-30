import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/astar?pair1=eth&pair2=atom");
}
