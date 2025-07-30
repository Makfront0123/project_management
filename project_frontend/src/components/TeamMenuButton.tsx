import React, { useState, useRef, useEffect } from "react";

interface TeamMenuButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TeamMenuButton: React.FC<TeamMenuButtonProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-2 ml-5" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            ✏️ Edit Team
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            🗑️ Delete Team
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamMenuButton;
