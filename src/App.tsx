import React, { useState, useRef } from 'react';
import { Camera, Download, Share2, Sparkles, Github, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface DraggableBoxProps {
  children: React.ReactNode;
  initialPosition?: Position;
  className?: string;
}

function DraggableBox({ children, initialPosition = { x: 0, y: 0 }, className = '' }: DraggableBoxProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setPosition({
      x: dragRef.current.initialX + dx,
      y: dragRef.current.initialY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = undefined;
  };

  return (
    <div
      className={`absolute cursor-move ${className} ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-12 relative overflow-hidden">
      {/* Main Profile Box */}
      <DraggableBox initialPosition={{ x: 50, y: 300 }} className="w-[600px]">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          {/* Chrome-like Tab Bar */}
          <div className="bg-gray-100/80 px-4 py-2 border-b border-gray-200/50 flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-gray-500 ml-4">Why u here?</div>
          </div>

          <div className="p-6">
            <div className="flex gap-6">
              {/* Photo Frame Section */}
              <div className="w-48">
                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50/50 overflow-hidden group relative cursor-pointer hover:border-purple-400 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-black/0 group-hover:bg-black/40 transition-all">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Add photo</p>
                  </div>
                  <img 
                    src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/477589280_1858346204993938_8763080063943454057_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH0IiXL9eB04SWj1ryTLQOhQUTE3st8XKlBRMTey3xcqYfAXzx5qfeuToa9g5b2InikvtYVpdbCdAAwNitb8PtS&_nc_ohc=O4F4C6_Xc1EQ7kNvgF7uVTQ&_nc_oc=Adi7uLp8nUBx4HijJ6D7hrHOVQbAWUyAPKs7juhPpZq_lySFx1478oHxvaRvtt8uozsHzEoe1h4X2E93bIAr_v2y&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=AGypPadtUlFIEiEEPDExGDi&oh=00_AYCt3iQ5MQgwIgP1aCXqh7FEHDxzhyIFyWAoXBApo9lwaQ&oe=67BA9C73hoto-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>


              {/* Info Section */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-gray-800">Kyoukaii_</h1>
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </div>
                  <p className="text-gray-600 text-sm">designer/ coder/ regular person</p>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  im cool.
                </p>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <h2 className="font-medium text-gray-800 text-sm mb-2">about me?</h2>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>im 16 yo.</li>
                    <li>im from Vietnam</li>
                    <li>a designer/ coder i guess?</li>
                    <li>just trying my best.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DraggableBox>

      {/* Top Box */}
      <DraggableBox initialPosition={{ x: 700, y: 50 }} className="w-[400px]">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">gift for person who visited.</h2>
          <div className="space-y-3">
            <a href="#" className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h3 className="font-medium text-gray-800">peekaboo</h3>
              <p className="text-sm text-gray-600 mt-1">my present!</p>
            </div>
            <a href="#" className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h3 className="font-medium text-gray-800">peekaboo</h3>
              <p className="text-sm text-gray-600 mt-1">my wife.</p>
            </div>
          </div>
        </div>
      </DraggableBox>

      {/* Bottom Box - Social Links */}
      <DraggableBox initialPosition={{ x: 700, y: 300 }} className="w-[400px]">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">social media</h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/75 transition-colors group">
              <Github className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">GitHub</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/75 transition-colors group">
              <Twitter className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/75 transition-colors group">
              <Linkedin className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/75 transition-colors group">
              <Instagram className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/75 transition-colors group col-span-2">
              <Globe className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">osu! profile</span>
            </a>
          </div>
        </div>
      </DraggableBox>
    </div>
  );
}

export default App;