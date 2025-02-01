import React, { useEffect, useState } from "react";
import dummy from "../assets/dummy.jpg";
import Popup from "./Popup";
import axios from "axios";
import { Camera } from "lucide-react";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const data = response.data;
      console.log(data);

      const groupedAlbums = data.reduce((acc, photo) => {
        if (!acc[photo.albumId]) {
          acc[photo.albumId] = [];
        }
        acc[photo.albumId].push(photo);
        return acc;
      }, {});

      const albumList = Object.keys(groupedAlbums).map((albumId) => ({
        id: albumId,
        photos: groupedAlbums[albumId],
      }));
      setAlbums(albumList);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleClosePopup = () => {
    setSelectedAlbum(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl text-center font-bold text-gray-900 mb-2 uppercase font-serif mb-12">
            Photo Albums
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleAlbumClick(album)}
            >
              <div className="relative aspect-video">
                <img
                  src={dummy}
                  alt={album.photos?.[0]?.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white w-6 h-6" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Album {album.id}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {album.photos?.length} photos
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {album.photos?.[0]?.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedAlbum && (
          <Popup album={selectedAlbum} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
};

export default Home;
