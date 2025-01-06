import { Avatar, Image, Spin } from "antd";
import { GetUrlFileFromStorageAsync } from "../../utils/utils";
import { useEffect, useState } from "react";

const BaseImage = ({ props, src, height = 200, width = 200, className = "" }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (src) {
      // Lấy URL từ Firebase Storage
      const fetchAvatarUrl = async () => {
        try {
          const url = await GetUrlFileFromStorageAsync(src);
          setAvatarUrl(url);
        } catch (error) {
          console.error("Error fetching avatar URL:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAvatarUrl();
    }
  }, [src]);

  return src ? (
    loading ? (
      <Spin /> // Hiển thị vòng xoay khi đang tải
    ) : (
      <Image className={className} width={width} height={height} src={avatarUrl} {...props} />
    )
  ) : (
    <></>
  );
};

export default BaseImage;
