/**
 * NAVI Sondt - groupbox
 * vd: title = {"group box"}
 * @param {title, children, className, classNameChildren} props
 * @returns
 */
export const GroupBox = ({ title, children, className, classNameChildren }) => {
  return (
    <div className={`border relative ${className} box-group-wrap p-0 mx-0`}>
      <div className="absolute left-6 top-[-14px] bg-gray-bg px-1 text-[15px] font-semibold text-heading-secondary">
        {title}
      </div>

      <div className={`px-6 py-3 flex flex-col groupbox-content ${classNameChildren}`}>{children}</div>
    </div>
  );
};
