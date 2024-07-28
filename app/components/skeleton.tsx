import React from "react"

export type FallbackProps = React.ComponentPropsWithoutRef<"div">

// <Fallback className="w-[440px] h-[72px] rounded-md" />
export const Fallback = React.forwardRef<
  React.ElementRef<"div">,
  FallbackProps
>(function FallbackComponent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className="mx-auto w-[440px] h-[300px] rounded-md bg-gray-200 relative overflow-hidden"
      {...props}
    />
  )
})

export type FallbackFlashProps = React.ComponentPropsWithoutRef<"div">

export const FallbackFlash = React.forwardRef<
  React.ElementRef<"div">,
  FallbackFlashProps
>(function FallbackFlashComponent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className="absolute bottom-0 top-0 w-[220px] bg-white/40 animate-skeleton-to-right"
      {...props}
    />
  )
})

type SkeletonProps = {}

export function Skeleton({}: SkeletonProps) {
  return (
    <div className="flex gap-8 w-full grow">
      <div className="w-[320px] h-[300px] rounded-md bg-gray-200 relative overflow-hidden">
        <FallbackFlash />
      </div>
      <div className="w-full grow h-screen rounded-md bg-gray-200 relative overflow-hidden">
        <FallbackFlash />
      </div>
    </div>
  )
}
