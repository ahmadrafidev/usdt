import { Explainer } from "@/components/explainer/explainer";
import { chapters } from "@/lib/chapters";

export default function Home() {
  return <Explainer chapters={chapters} />;
}
