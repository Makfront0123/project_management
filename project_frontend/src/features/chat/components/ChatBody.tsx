const ChatBody = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-w-[52vh] min-h-[52vh] max-h-[72vh] overflow-y-scroll">
      
      <div className="flex flex-col gap-4 p-4">
        {/* mensajes */}
        <div className="bg-white p-2 rounded">Mensaje 1</div>
        <div className="bg-white p-2 rounded">Mensaje 2</div>
        <div className="bg-white p-2 rounded">Mensaje 3</div>
      </div>

    </div>
  )
}

export default ChatBody