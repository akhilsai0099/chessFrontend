const Hints = ({
  hints,
  squareSize,
}: {
  hints: string[];
  squareSize: number;
}) => {
  return (
    <>
      {hints.map((hint, idx) => (
        <div
          key={idx}
          className={`absolute  left-0  text-6xl square${hint} flex justify-center items-center text-center z-10`}
          id="hint"
          style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
        >
          <div
            className="bg-gray-400 rounded-full"
            style={{
              width: `${squareSize / 3}px`,
              height: `${squareSize / 3}px`,
            }}
          ></div>
        </div>
      ))}
    </>
  );
};

export default Hints;
