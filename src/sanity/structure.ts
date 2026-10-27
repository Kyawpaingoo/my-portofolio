import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons: each always opens its one document.
      S.listItem()
        .title("Profile")
        .id("profile")
        .schemaType("profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.listItem()
        .title("About")
        .id("about")
        .schemaType("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .schemaType("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Tech stack")
        .id("techStack")
        .schemaType("techStack")
        .child(S.document().schemaType("techStack").documentId("techStack")),
      S.divider(),
      S.documentTypeListItem("experience")
        .title("Experience")
        .child(
          S.documentTypeList("experience")
            .title("Experience")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.documentTypeListItem("project")
        .title("Projects")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
