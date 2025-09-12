const DarkAndLightMode = ({ setDarkMode }) => {
  return (
    <div className=" p-6  mx-auto mt-6">
      <label className="block text-lg font-semibold dark:text-white text-zinc-800 mb-3">
        Theme Mode
      </label>
      <select
        className="w-full p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 
               focus:ring-2 focus:ring-zinc-700 focus:outline-none cursor-pointer"
        onChange={(event) => setDarkMode(event.target.value)}
      >
        <option value="dark">Dark Mode 🌙 </option>
        <option value="light">Light Mode ☀️</option>
      </select>
      <h1 className="text-sm dark:text-white text-zinc-800 mt-4">
        For best experience, choose{" "}
        <span className="font-bold dark:text-yellow-300">Dark Mode</span> ✨
      </h1>
    </div>
  );
};

export default DarkAndLightMode;
