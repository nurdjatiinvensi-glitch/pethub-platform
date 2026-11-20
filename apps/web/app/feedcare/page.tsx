import AppShell from "../components/layout/AppShell";

import FeedCareContent from "./components/FeedCareContent";
import FeedCareCatalog from "./components/FeedCareCatalog";

export default function FeedCarePage() {
  return (
    <AppShell>
      <FeedCareContent>
        <FeedCareCatalog />
      </FeedCareContent>
    </AppShell>
  );
}
