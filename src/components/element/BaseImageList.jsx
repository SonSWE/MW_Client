import { Image } from "antd";
import { useEffect, useState } from "react";
import { convertToArray } from "../../utils/convertData";
import BaseImage from "./BaseImage";

const BaseImageList = ({ size, src }) => {
  const [lstImage, setLstImage] = useState([]);
  useEffect(() => {
    console.log(src)
    setLstImage(convertToArray(src));
  }, [src]);
  return (
    <Image.PreviewGroup
      preview={{
        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
      }}
    >
      {lstImage.map((e) => (
        <BaseImage src={e} />
      ))}
    </Image.PreviewGroup>
  );
};

export default BaseImageList;
