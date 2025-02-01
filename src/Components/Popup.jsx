import React from "react";
import dummy from "../assets/dummy.jpg";
import { X } from "lucide-react";

const Popup = ({ album, onClose }) => {
  if (!album) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-xl 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 
        hover:scrollbar-thumb-gray-400 
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-indigo-100 
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-indigo-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:bg-indigo-400"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Album {album.id}
            </h2>
            <p className="text-gray-600 mt-1">{album.photos.length} photos</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black rounded-full transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {album.photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={dummy}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
                  <p className="text-white text-sm truncate">{photo.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
