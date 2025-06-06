function Inputbox({
  label,
  type,
  placeholder,
  setValue,
}: {
  label: string;
  type: string;
  placeholder: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
    </div>
  );
}
export default Inputbox;
