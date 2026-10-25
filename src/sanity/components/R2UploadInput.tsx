"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Box, Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { set, setIfMissing, unset, type ObjectInputProps } from "sanity";

import type { UploadResult } from "../../app/studio/api/upload/route";
import { FILE_TYPES, IMAGE_TYPES, mediaUrl } from "../../lib/media";

type R2Value = {
  key?: string;
  filename?: string;
  contentType?: string;
};

type Kind = "image" | "file";

const ACCEPT: Record<Kind, string> = {
  image: Object.keys(IMAGE_TYPES).join(","),
  file: Object.keys(FILE_TYPES).join(","),
};

/**
 * Uploads to R2 via /studio/api/upload and stores the returned key (plus
 * size/type/dimensions) on the field. Remaining fields such as `alt` are
 * rendered by the default object input.
 */
function R2UploadInput({ kind, ...props }: ObjectInputProps & { kind: Kind }) {
  const value = props.value as R2Value | undefined;
  const { onChange, readOnly, schemaType } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(undefined);
    try {
      const body = new FormData();
      body.append("file", file);
      if (kind === "image") {
        const dimensions = await measure(file);
        if (dimensions) {
          body.append("width", String(dimensions.width));
          body.append("height", String(dimensions.height));
        }
      }

      const response = await fetch("/studio/api/upload", {
        method: "POST",
        body,
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error(await response.text());
      const result = (await response.json()) as UploadResult;

      onChange([
        setIfMissing({ _type: schemaType.name }),
        set(result.key, ["key"]),
        set(result.contentType, ["contentType"]),
        set(result.size, ["size"]),
        ...(kind === "image"
          ? [
              result.width ? set(result.width, ["width"]) : unset(["width"]),
              result.height ? set(result.height, ["height"]) : unset(["height"]),
            ]
          : [set(result.filename, ["filename"])]),
      ]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Stack gap={3}>
      {value?.key && kind === "image" && (
        <Card radius={2} border overflow="hidden" style={{ maxWidth: 320 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${mediaUrl(value.key)}?w=640&q=75`}
            alt=""
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Card>
      )}
      {value?.key && kind === "file" && (
        <Card padding={3} radius={2} border>
          <Text size={1}>
            <a href={mediaUrl(value.key)} target="_blank" rel="noreferrer">
              {value.filename ?? value.key}
            </a>
          </Text>
        </Card>
      )}

      <Flex gap={2} align="center">
        <Button
          text={value?.key ? "Replace" : `Upload ${kind}`}
          mode="ghost"
          disabled={readOnly || uploading}
          onClick={() => fileInput.current?.click()}
        />
        {value?.key && (
          <Button
            text="Remove"
            mode="ghost"
            tone="critical"
            disabled={readOnly || uploading}
            onClick={() => onChange(unset())}
          />
        )}
        {uploading && <Spinner muted />}
      </Flex>
      <input
        ref={fileInput}
        type="file"
        accept={ACCEPT[kind]}
        hidden
        onChange={upload}
      />

      {error && (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      <Box>{props.renderDefault(props)}</Box>
    </Stack>
  );
}

async function measure(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    const dimensions = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return dimensions;
  } catch {
    return undefined;
  }
}

export function R2ImageInput(props: ObjectInputProps) {
  return <R2UploadInput kind="image" {...props} />;
}

export function R2FileInput(props: ObjectInputProps) {
  return <R2UploadInput kind="file" {...props} />;
}
