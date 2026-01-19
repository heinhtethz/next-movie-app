export default function CircleProgress({ value }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:scale-110">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-[5px] border-[#071a1c]"></div>

      {/* Inner Animated Ring */}
      {value > 70 && (
        <div
          className="absolute inset-1 rounded-full transition-all duration-[1500ms]"
          style={{
            background: `conic-gradient(#21D07A ${value}%, #204529 0%)`,
          }}
        ></div>
      )}

      {value < 70 && (
        <div
          className="absolute inset-1 rounded-full transition-all duration-[1500ms]"
          style={{
            background: `conic-gradient(#D2D531 ${value}%, #204529 0%)`,
          }}
        ></div>
      )}

      {value < 40 && (
        <div
          className="absolute inset-1 rounded-full transition-all duration-[1500ms]"
          style={{
            background: `conic-gradient(#DB1B09 ${value}%, #204529 0%)`,
          }}
        ></div>
      )}

      {/* Dark Center Circle */}
      <div className="absolute inset-2 bg-[#071a1c] rounded-full"></div>

      {/* Text */}
      <span className="absolute left-4.5 text-white text-xl font-bold">
        {value}
        <span className="absolute text-[8px] top-1">%</span>
      </span>
    </div>
  );
}
