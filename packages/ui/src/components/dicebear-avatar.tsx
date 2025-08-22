"use client";

import { useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export function DicebearAvatar({
  seed,
  size = 32,
  className,
  badgeClassName,
  badgeImageUrl,
  imageUrl,
}: DicebearAvatarProps) {
  const avatarSrc = useMemo(() => {
    if (imageUrl) return imageUrl;

    const avatar = createAvatar(thumbs, {
      seed: seed.toLocaleLowerCase().trim(),
      size,
    });

    return avatar.toDataUri();
  }, [seed, size]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage alt="image" src={avatarSrc} />
      </Avatar>
      {badgeImageUrl && (
        <div
          className={cn(
            "absolute right-0 bottom-0 flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background",
            badgeClassName,
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <img
            src={badgeImageUrl}
            width={badgeSize}
            alt="badge"
            className="h-full object-cover w-full"
            height={badgeSize}
          />
        </div>
      )}
    </div>
  );
}
