/**
 * NAVI Sondt - groupbox
 * vd: title = {"group box"}
 * @param {title, children, className, classNameChildren} props
 * @returns
 */
export const GroupBox = ({ title, children, className, classNameChildren }) => {
  return (
    <div className={`border relative ${className} rounded-lg p-0 mx-0 w-full`}>
      <div className="absolute left-6 top-[-14px] bg-white px-1 text-[15px] font-semibold text-heading-secondary">
        {title}
      </div>

      <div className={`px-6 py-3 flex flex-col ${classNameChildren}`}>{children}</div>
    </div>
  );
};
