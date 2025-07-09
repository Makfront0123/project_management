
export const Loading = () => {
  return (
    <div className="flex flex-col gap-y-12 items-center justify-center min-h-screen bg-white">
      <div className="size-30 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-4xl font-bold animate-bounce">Loading</h2>
    </div>
  )
}
