import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "antd";

/**
 * Base is a base input component for forms.
 *
 * @param props - Tham số truyền vào .

 */
export const ButtonAction = ({
  props,
  title,
  id = "search-func",
  disabled,
  className,
  onClick,
  icon,
  styleIcon,
}) => {
  return (
    <Tooltip placement="top" title={title}>
      <Button
        disabled={disabled}
        id={id}
        className={`${className}`}
        onClick={onClick && onClick}
        size="small"
      >
        <FontAwesomeIcon icon={icon} style={styleIcon} className="text-[#1677ff]" />
        <span>{title}</span>
      </Button>
    </Tooltip>
  );
};
