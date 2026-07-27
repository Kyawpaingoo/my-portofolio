function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightText({
  text,
  keywords,
}: {
  text: string;
  keywords: string[];
}) {
  if (keywords.length === 0) return <>{text}</>;

  const pattern = new RegExp(
    `(${[...keywords]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-accent">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
