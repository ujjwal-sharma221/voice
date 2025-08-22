import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

interface infiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function InfiniteScrollTrigger({
  loadMoreText = "Load More",
  noMoreText = "No more Items",
  ...props
}: infiniteScrollTriggerProps) {
  let text = loadMoreText;

  if (props.isLoadingMore) text = "loading";
  else if (!props.canLoadMore) text = noMoreText;

  return (
    <div
      className={cn("flex w-full justify-center py-2", props.className)}
      ref={props.ref}
    >
      <Button
        disabled={!props.canLoadMore || props.isLoadingMore}
        onClick={props.onLoadMore}
        size="sm"
        variant="ghost"
      >
        {text}
      </Button>
    </div>
  );
}
