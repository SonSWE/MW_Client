import { Avatar, Spin } from "antd";
import { GetUrlFileFromStorageAsync } from "../../utils/utils";
import { useEffect, useState } from "react";

const BaseAvatar = ({ size, src }) => {
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

  return loading ? (
    <Spin /> // Hiển thị vòng xoay khi đang tải
  ) : (
    <Avatar size={size} src={avatarUrl} />
  );
};

export default BaseAvatar;
