"use client";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white">
      <h1 className="text-5xl font-bold animate-fade-in">
        Welcome to Your Backend 🌙
      </h1>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
