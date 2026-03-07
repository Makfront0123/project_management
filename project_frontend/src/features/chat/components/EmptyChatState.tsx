const EmptyChatState = () => {
  return (
    <div className="flex-1 flex items-center justify-center w-full h-full z-40 overflow-hidden
  bg-[url('/images/bg-light.png')] dark:bg-[url('/images/bg-dark.jpg')]
  bg-cover bg-center relative"
    >
      <div className="absolute inset-0 h-full w-full bg-black/86 z-10">
      </div>

      <span className="text-white z-40 text-2xl">Select a contact to start chatting</span>
    </div>
  );
};
export default EmptyChatState;