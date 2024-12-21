import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListMenu = ({ menuData }) => {
  return (
    <ul className="list-button-menu">
      {menuData.map((menu, index) => (
        <li className="button-menu" key={index}>
          <a href={menu.url}>{menu.title}</a>
          {menu.children && menu.children.length > 0 && (
            <>
              <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
              <ul className="list-button-menu-children">
                <div className="arrow"></div>
                {menu.children.map((child, childIndex) => (
                  <li className="button-menu" key={childIndex}>
                    <a href={child.url}>{child.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListMenu;
