import { MARKUP } from "./markup";
import ScriptLoader from "./ScriptLoader";

/**
 * Server Component. The 62 KB of static section markup is rendered to HTML on
 * the server (at build time, since the app is statically exported) and is NOT
 * shipped again in the client bundle. Only <ScriptLoader> is a client
 * component, and it renders nothing — it just wires up the runtime scripts.
 */
export default function Dashboard() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
      <ScriptLoader />
    </>
  );
}
