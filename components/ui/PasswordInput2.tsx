import Image from "next/image";
import { useState } from "react";

type InputType = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  inputType: string;
  error?: any;
  placeholder?: string;
  required?: boolean;
  inputMode?: string;
  style?: string;
};

const PasswordInput2 = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
  placeholder,
  required,
  inputMode,
  style,
}: InputType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className="relative w-full flex flex-col">
      <label className="text-base font-light flex gap-1" htmlFor={htmlFor}>
        {label}
        <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
          {required ? "*" : "(Optional)"}
        </p>
      </label>
      <div
        className={`flex items-center justify-between border pl-4 border-gray-400 ${style}`}
      >
        <input
          {...inputRegister}
          type={isPasswordVisible ? "text" : "password"}
          className="w-full py-3 text-sm transition focus:transition focus:outline-none"
          id={htmlFor}
          placeholder={placeholder}
          inputMode={inputMode}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          data-lpignore="true"
        />
        <button
          type="button"
          className="flex items-center px-4 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <Image
              src="/eye-slash.svg"
              width={20}
              height={20}
              alt="hide-password"
            />
          ) : (
            <Image
              src="/eye-no-slash.svg"
              width={20}
              height={20}
              alt="hide-password"
            />
          )}
        </button>
      </div>
      {error}
    </section>
  );
};

export default PasswordInput2;
