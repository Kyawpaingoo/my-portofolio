/**
 * Icons a Tech stack group can use. The Studio stores the `value`;
 * src/components/TechStack.tsx maps it to a lucide icon. Plain data so both
 * the Studio schema and the site can import it.
 */
export const TECH_STACK_ICONS = [
  { title: "Code", value: "code" },
  { title: "Layout / UI", value: "layout" },
  { title: "Server", value: "server" },
  { title: "Database", value: "database" },
  { title: "Cloud", value: "cloud" },
  { title: "Mobile", value: "mobile" },
  { title: "AI / ML", value: "ai" },
  { title: "Testing", value: "testing" },
  { title: "Security", value: "security" },
  { title: "Tools", value: "tools" },
] as const;

export type TechStackIcon = (typeof TECH_STACK_ICONS)[number]["value"];
