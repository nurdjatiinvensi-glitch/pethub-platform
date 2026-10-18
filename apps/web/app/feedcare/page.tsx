import AppShell from "../components/layout/AppShell";

import FeedCareContent from "./components/FeedCareContent";
import FeedCarePackages from "./components/FeedCarePackages";

export default function FeedCarePage() {
  return (
    <AppShell>
      <FeedCareContent>
        <FeedCarePackages />
      </FeedCareContent>
    </AppShell>
  );
}
