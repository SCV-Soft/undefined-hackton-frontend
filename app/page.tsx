import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/swap/layer1?target=eth");
}
